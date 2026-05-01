# CivicGuide

A neutral, citation-first election process assistant for voters, students, first-time voters, and citizens who want to understand election workflows clearly. Built for PromptWars Challenge 2.

## License
Apache License 2.0

## Features
- Guided Intake
- Election Journey Map
- Personalized Timeline
- Ask Assistant (Powered by Gemini 2.5 Flash)
- Glossary & Quiz

## Tech Stack
- Frontend: React + TypeScript + Vite
- Backend: Fastify + TypeScript (Node.js)
- AI: Google Gemini API

## Setup Instructions
1. Run `npm install`
2. Copy `.env.example` to `.env` and add your Gemini API key.
3. Run `npm run dev` to start the frontend and backend concurrently.

## Deployment
This app is designed to be deployed on Google Cloud Run. The backend serves the Vite built static assets in production.
