FROM node:22-alpine AS builder

WORKDIR /tmp

COPY package.json pnpm-lock.yaml ./

RUN npm install -g corepack@latest

RUN corepack enable

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm build

FROM node:22-alpine

WORKDIR /app

RUN apk add openssl

COPY package.json pnpm-lock.yaml ./

RUN npm install -g corepack@latest

RUN corepack enable

RUN pnpm install --prod

COPY --from=builder /tmp/prisma ./prisma
COPY --from=builder /tmp/dist ./dist
COPY --from=builder /tmp/scripts ./scripts

RUN npx prisma generate

EXPOSE 3500

CMD [ "sh", "./scripts/entrypoint.sh" ]