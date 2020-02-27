# For multi architecture. Allows x86 to run and build armhf images
FROM alpine AS qemu

# Download QEMU, see https://github.com/docker/hub-feedback/issues/1261
ENV QEMU_URL https://github.com/balena-io/qemu/releases/download/v3.0.0%2Bresin/qemu-3.0.0+resin-arm.tar.gz
RUN apk add curl && curl -L ${QEMU_URL} | tar zxvf - -C . --strip-components 1


# Build stage
FROM arm32v7/node:12-alpine as builder
# Add QEMU
COPY --from=qemu qemu-arm-static /usr/bin

WORKDIR /tmp/build
ADD package.json package-lock.json tsconfig.json ./
ADD src ./src/
RUN npm ci && npm run build


# App stage
FROM arm32v7/node:12-alpine
# Add QEMU
COPY --from=qemu qemu-arm-static /usr/bin

USER root
WORKDIR /opt/app
ENV NODE_ENV=production

ADD package.json package-lock.json ./
RUN npm ci --only=production
ADD .env .env.production ./
COPY --from=builder /tmp/build/dist ./dist/

CMD [ "node", "dist/index.js" ]