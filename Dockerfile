FROM oven/bun:1.0-alpine

WORKDIR /app
COPY . .

RUN bun install --production

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "src/server.ts"]
