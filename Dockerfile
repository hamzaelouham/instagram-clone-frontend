FROM node:16.14-alpine AS deps

WORKDIR /app 

COPY package.json yarn.lock ./

RUN npm install -g npm

RUN npm install -g yarn --force

RUN yarn install


FROM node:16.14-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN yarn run build

FROM node:16.14-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/package.json /app/

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

CMD [ "yarn", "start" ]

