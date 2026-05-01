import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = Fastify({
  logger: true
});

// Security and CORS
server.register(helmet, { contentSecurityPolicy: false }); // CSP disabled for dev ease, configure properly in prod
server.register(cors);

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

// Helper to construct AI prompt with official sources
function buildSystemPrompt(userProfile: any) {
  const sourcesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/sources.json'), 'utf8')
  );

  let p = `You are CivicGuide AI, a nonpartisan, highly accurate civic education assistant grounded in official source data.\n`;
  p += `Here are the official source websites we rely on:\n`;
  
  sourcesData.sources.forEach((s: any) => {
    p += `- ${s.title}: ${s.url} (Topic: ${s.topic})\n`;
  });

  if (userProfile) {
    p += `\nThe user is from the state/UT: ${userProfile.state || 'India'}. `;
    p += `Age group: ${userProfile.ageGroup || 'General'}. `;
    if (userProfile.firstTimeVoter) p += `They are a first-time voter. `;
    if (userProfile.movedRecently) p += `They moved recently. `;
    p += `Use these user parameters to customize your response without exposing any sensitive PII.`;
  }

  p += `\nGuidelines for your response:\n`;
  p += `1. Provide specific, concise answers about the voting process.\n`;
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
  try {
    const { message, profile } = request.body || {};
    if (!message) {
      return reply.status(400).send({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return reply.status(500).send({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    // --- Stage 1: Guardrail Agent ---
    // Scan question for sensitive PII or political attacks
    const hasSensitiveData = /aadhaar|ssn|pan|voter id|phone|dob|birth|address|email/i.test(message);
    const containsCandidateInfo = /vote for|elect|defeat|support|candidate/i.test(message);

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
      server.log.warn(`Google SDK failed, attempting direct HTTP fetch: ${sdkError.message}`);
      
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

    const sourcesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/sources.json'), 'utf8')
    );

    return { 
      response: generatedText || "No response generated.",
      sources: sourcesData.sources
    };
  } catch (err: any) {
    server.log.error(err);
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

  // Fallback for React Router
  server.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });
}

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8080;
    await server.listen({ port, host: '127.0.0.1' });
    console.log(`Server listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
