FROM node:lts

ARG BASE_URL
ARG USERNAME
ARG PASSWORD
ARG PORT
ARG NODE_ENV
ARG SWAGGER_USERNAME
ARG SWAGGER_PASSWORD

ENV BASE_URL=$BASE_URL \
    USERNAME=$USERNAME \
    PASSWORD=$PASSWORD \
    PORT=$PORT \
    NODE_ENV=$NODE_ENV \
    SWAGGER_USERNAME=$SWAGGER_USERNAME \
    SWAGGER_PASSWORD=$SWAGGER_PASSWORD

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup appgroup && adduser -S appuser -G appgroup

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/api/health || exit 1

USER appuser

CMD ["npm", "run", "start:prod"]
