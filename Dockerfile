# Build stage
FROM node:12.13-alpine AS builder
WORKDIR /tmp/build
ADD package.json package-lock.json tsconfig.json ./
ADD src ./src/
RUN npm ci && npm run build


# App stage
FROM node:12.13-alpine

USER root
WORKDIR /opt/app
ENV NODE_ENV=production

ADD package.json package-lock.json ./
RUN npm ci --only=production
ADD .env .env.production ./
COPY --from=builder /tmp/build/dist ./dist/

CMD [ "node", "dist/index.js" ]