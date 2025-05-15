FROM node:slim AS builder

WORKDIR /tmp

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:slim

WORKDIR /app

COPY --from=builder /tmp/.output/ .

EXPOSE 3000

CMD ["node", "server/index.mjs"]