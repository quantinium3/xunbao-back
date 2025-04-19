FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .

FROM base AS production
WORKDIR /usr/src/app

COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/bun.lockb .

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
USER bun
CMD ["bun", "run", "src/server.ts"]
