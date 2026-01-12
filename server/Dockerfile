
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

FROM base AS development

RUN npm ci
COPY src ./src

CMD ["npm", "run", "start:dev"]

FROM development AS builder
RUN npx prisma generate
RUN npm run build

RUN npm prune --production

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/prisma ./prisma

CMD ["node", "dist/src/main.js"]