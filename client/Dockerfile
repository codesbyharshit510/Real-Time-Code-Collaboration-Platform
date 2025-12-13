# Stage 1: Build the project
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files and install dependencies
COPY package*.json .

RUN npm ci

# Copy the rest of the source code and build
COPY . .

# --- ADD THESE LINES ---
# 1. Accept the argument defined in docker-compose.yml
ARG VITE_BACKEND_URL
# 2. Make it available as an environment variable during the build step
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# -----------------------

RUN npm run build
RUN npm prune --omit=dev

# Stage 2: Serve the `dist` folder
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built frontend from the builder stage
COPY --from=builder /build/dist dist/
COPY --from=builder /build/package*.json .
COPY --from=builder /build/node_modules ./node_modules

# Expose the port
EXPOSE 5173

# Start the server
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]