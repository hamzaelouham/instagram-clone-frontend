FROM node:16.14-alpine AS deps

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app 

COPY package*.json yarn.lock ./

RUN yarn 



FROM node:16.14-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN yarn run build

FROM node:16.14-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/public ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/package.json /app/


EXPOSE 3000
CMD [ "yarn", "start" ]
