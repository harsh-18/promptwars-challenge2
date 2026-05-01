# Stage 1: Build the React/Vite Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build:ui

# Stage 2: Final Production Environment
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --force

# Copy static frontend assets and backend code
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/server ./server

# Set Production Environment variables
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the Fastify backend server directly via tsx
RUN npm install -g tsx
CMD ["npx", "tsx", "server/index.ts"]
