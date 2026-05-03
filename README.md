# CivicGuide - Election Process Education Platform

A neutral, citation-first election process assistant for voters, students, first-time voters, and citizens to understand election workflows clearly. Built for **Google PromptWars Virtual 2026 - Challenge 2**.

## Table of Contents
- [1. Chosen Vertical](#1-chosen-vertical)
- [2. Approach and Logic](#2-approach-and-logic)
- [3. How the Solution Works](#3-how-the-solution-works)
- [4. Key Assumptions Made](#4-key-assumptions-made)
- [5. Features](#5-features)
- [6. Tech Stack](#6-tech-stack)
- [7. Security & Reliability](#7-security--reliability)
- [8. Installation & Setup](#8-installation--setup)
- [9. Recent Optimizations & Testing Depth](#9-recent-optimizations--testing-depth)

---

## 1. Chosen Vertical
**Challenge 2 - Election Process Education**  
*Objective:* Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

---

## 2. Approach and Logic
CivicGuide approaches election education through **dynamic multi-jurisdiction personalization** and **reliable, nonpartisan AI grounding**.

- **Localization First:** Instead of providing static, generic election information, the platform prompts the user for their country of residence, state, first-time voter status, and recent address changes.
- **Dual-Jurisdiction Coverage:** It perfectly adapts its entire interface, timelines, glossary, quiz, and AI assistant to either **India** or the **United States**.
- **Official Grounding:** AI responses from Google Gemini are dynamically steered by trusted, nonpartisan local databases (ECI for India and USA.gov / Vote.gov for the USA) to strictly avoid bias, political recommendations, or obsolete URLs.

---

## 3. How the Solution Works
1. **Guided Intake Form:** Gathers basic non-PII details (Country, State/UT, first-time voter status, address changes, age group).
2. **Dynamic Dashboard & Timeline:** Generates a personalized checklist outlining the upcoming exact steps (registering, shifting address, ID requirements, polling day prep).
3. **Continuous Election Timeline:** Offers a dynamic, scrollable timeline with complete maps and an interactive polling booth search box.
4. **Interactive Civic Glossary & Quiz:** Empowers users to learn key democratic terms and test their knowledge with localized questions.
5. **Smart AI Assistant:** Users can ask the AI questions in a direct conversation. It reads the user’s selected country and returns highly localized, nonpartisan answers grounded in official sources.

---

## 4. Key Assumptions Made
- **Neutrality:** The assistant assumes users require purely factual, operational guidance on *how* to vote and *when* to register, strictly avoiding any political or candidate bias.
- **Official URLs:** Assumes current official domains (e.g., `voters.eci.gov.in` and `vote.gov`) remain the authoritative entry points for registration.
- **Dynamic Session Mode:** In-memory local user sessions (persisted via LocalStorage) allow any visitor to instantly switch their country profile directly within the UI on-the-fly.

---

## 5. Features
- Multi-state/UT/Region guided intake
- Cross-country toggle directly from the header
- Polling booth interactive map search
- Contextual, dual-jurisdiction glossary and quiz
- Grounded Gemini AI assistant with direct country injection

---

## 6. Tech Stack
- **Frontend:** React + TypeScript + Vite + Vanilla CSS
- **Backend:** Fastify + TypeScript (Node.js)
- **AI Integration:** Google GenAI SDK (Gemini 2.5 Flash)
- **Deployment:** Google Cloud Build + Google Cloud Run

---

## 7. Security & Reliability
- **Google Cloud Secret Manager**: Retrieves the `GEMINI_API_KEY` securely in the production container to prevent API key leakage.
- **Google Cloud Logging**: Structured JSON logging ensures detailed backend tracking, error handling, and AI API call latencies are securely visible.
- **Testing Suite**: Includes a complete **Vitest** test suite covering:
  - Multi-jurisdiction timeline generation logic.
  - Interactive country switching logic.
  - Mocking AI responses for consistent integration testing.

---

## 8. Installation & Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   npm install --force
   ```
2. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Run the automated test suite:
   ```bash
   npm run test
   ```
4. Start the application locally:
   ```bash
   npm run dev
   ```

---

## 9. Recent Optimizations & Testing Depth
1. **Frontend Bundle Optimizations**: Implemented dynamic import splitting with `React.lazy()` and `React.Suspense` fallback logic for the Map and AI Assistant pages.
2. **Dynamic Caching**: Configured a specialized Fastify caching hook with advanced `Cache-Control` headers for all server static data routes to ensure maximum response performance.
3. **Dual-Country Context Isolation**: Extracted cross-country switching functionality into a specialized `useElectionContext` custom hook, optimizing the code for the Glossary, Journey, and Quiz pages.
4. **Architectural Code Maturity**: Added thorough JSDoc definitions across all exported functions to secure architectural documentation rigor.
5. **Testing Depth Expansion**:
   - Added exactly two **Playwright E2E "Happy Path" tests** to validate the voter workflow.
   - Integrated a **k6 benchmarking script** to validate server responsiveness SLAs.
