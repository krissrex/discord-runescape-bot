FROM node:12.13-alpine

USER root
WORKDIR /opt/app

ADD package.json package-lock.json ./
RUN npm ci --only=production

ADD dist ./

ENV NODE_ENV=production

ENTRYPOINT [ "node", "index.js" ]
