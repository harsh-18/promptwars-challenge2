import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Advanced Logging using structured JSON format perfectly suited for GCP Cloud Logging
const gcpLogger = {
  info: (msg: string, meta: any = {}) => {
    console.log(JSON.stringify({ severity: 'INFO', message: msg, ...meta, timestamp: new Date().toISOString() }));
  },
  warn: (msg: string, meta: any = {}) => {
    console.warn(JSON.stringify({ severity: 'WARNING', message: msg, ...meta, timestamp: new Date().toISOString() }));
  },
  error: (msg: string, meta: any = {}) => {
    console.error(JSON.stringify({ severity: 'ERROR', message: msg, ...meta, timestamp: new Date().toISOString() }));
  }
};

const server = Fastify({
  logger: false // Turn off default fastify pino logger to use Winston-style structured GCP logging instead
});

// Security and CORS
server.register(helmet, { contentSecurityPolicy: false });
server.register(cors);

// Optimize Cache-Control headers for static civic data and GET requests
server.addHook('onRequest', async (request, reply) => {
  if (request.method === 'GET') {
    reply.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }
});

/**
 * Asynchronously retrieves the Google Gemini API key from the environment
 * or the Google Cloud Secret Manager.
 * 
 * @returns {Promise<string>} The API key as a string.
 */
async function getApiKey(): Promise<string> {
  const envKey = process.env.GEMINI_API_KEY;
  if (envKey) return envKey;

  // Simulate or execute @google-cloud/secret-manager dynamic access
  try {
    // @ts-ignore
    const { SecretManagerServiceClient } = await import('@google-cloud/secret-manager');
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: process.env.GEMINI_SECRET_NAME || 'projects/vaulted-botany-325217/secrets/GEMINI_API_KEY/versions/latest',
    });
    const key = version.payload?.data?.toString();
    if (key) return key;
  } catch (err: any) {
    gcpLogger.warn('Google Cloud Secret Manager retrieval skipped or failed, using environment variable fallback.', { error: err.message });
  }

  return '';
}

/**
 * Dynamically builds a system prompt for the Gemini AI generation based on
 * the nonpartisan civic sources and custom user profile parameters.
 * 
 * @param {any} userProfile The user profile containing demographic data.
 * @returns {string} The customized system prompt string.
 */
function buildSystemPrompt(userProfile: any) {
  const sourcesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/sources.json'), 'utf8')
  );

  const country = userProfile?.country || 'India';

  let p = `You are CivicGuide AI, a nonpartisan, highly accurate civic education assistant grounded in official source data specifically for citizens of ${country}.\n`;
  p += `Here are the official source websites we rely on:\n`;
  
  sourcesData.sources.forEach((s: any) => {
    p += `- ${s.title}: ${s.url} (Topic: ${s.topic}, Jurisdiction: ${s.jurisdiction})\n`;
  });

  if (userProfile) {
    p += `\nThe user is from the state/region: ${userProfile.state || country}. `;
    p += `Age group: ${userProfile.ageGroup || 'General'}. `;
    if (userProfile.firstTimeVoter) p += `They are a first-time voter. `;
    if (userProfile.movedRecently) p += `They moved recently. `;
    p += `Customize your response exactly for the context of ${country} and their state/region without exposing any sensitive PII.`;
  }

  p += `\nGuidelines for your response:\n`;
  p += `1. Provide specific, concise answers about the voting process in ${country}.\n`;
  p += `2. Always cite the appropriate source from above if relevant.\n`;
  p += `3. Only refer to official processes and ignore speculation or unofficial procedures.\n`;
  p += `4. Be professional and encouraging. Keep it short and readable.\n`;

  return p;
}

// Health check endpoint
server.get('/api/health', async (request, reply) => {
  return { ok: true, service: 'civicguide', version: '1.0.0' };
});

// AI Chat assistant endpoint
server.post('/api/chat', async (request: any, reply) => {
  const startTime = Date.now();
  try {
    const { message, profile } = request.body || {};
    if (!message) {
      return reply.status(400).send({ error: 'Message is required' });
    }

    const apiKey = await getApiKey();
    if (!apiKey) {
      gcpLogger.error('API key retrieval failed: Key not configured.');
      return reply.status(500).send({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    // --- Stage 1: Guardrail Agent ---
    const hasSensitiveData = /aadhaar|ssn|pan|voter id|phone|dob|birth|address|email/i.test(message);
    if (hasSensitiveData) {
      return reply.status(200).send({
        response: "Security Alert: For your privacy and data security, please do not share any personal sensitive identifiers (such as Voter ID, Aadhaar, PAN, phone number, or date of birth) in the assistant chat.",
        sources: []
      });
    }

    // --- Stage 2: Answering Agent ---
    const systemPrompt = buildSystemPrompt(profile);
    let generatedText = '';

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
        ]
      });
      generatedText = response.text || '';
    } catch (sdkError: any) {
      gcpLogger.warn(`Google SDK failed, attempting direct HTTP fetch: ${sdkError.message}`);
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }]
        })
      });

      if (!res.ok) {
        throw new Error(`Gemini API HTTP Error: ${res.statusText}`);
      }
      const data = await res.json();
      generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    const latencyMs = Date.now() - startTime;
    gcpLogger.info('AI Response latency log', { latencyMs, userCountry: profile?.country || 'India' });

    const sourcesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/sources.json'), 'utf8')
    );

    return { 
      response: generatedText || "No response generated.",
      sources: sourcesData.sources,
      latencyMs
    };
  } catch (err: any) {
    gcpLogger.error('AI chat endpoint error: ' + err.message, { stack: err.stack });
    return reply.status(500).send({ error: err.message || 'Error processing AI chat' });
  }
});

// Serve static files in production
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const distPath = path.join(__dirname, '../dist');
  server.register(fastifyStatic, {
    root: distPath,
  });

  server.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });
}

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8080;
    await server.listen({ port, host: '0.0.0.0' });
    gcpLogger.info(`Server listening at http://localhost:${port}`);
  } catch (err: any) {
    gcpLogger.error('Startup error: ' + err.message);
    process.exit(1);
  }
};

start();
