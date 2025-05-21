FROM node:lts

ARG BASE_URL
ARG USERNAME
ARG PASSWORD
ARG PORT
ARG NODE_ENV
ARG SWAGGER_USERNAME
ARG SWAGGER_PASSWORD

ENV BASE_URL=${BASE_URL} \
    USERNAME=${USERNAME} \
    PASSWORD=${PASSWORD} \
    PORT=${PORT} \
    NODE_ENV=${NODE_ENV} \
    SWAGGER_USERNAME=${SWAGGER_USERNAME} \
    SWAGGER_PASSWORD=${SWAGGER_PASSWORD}

WORKDIR /opt/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

RUN groupadd --gid 1001 appgroup \        # <<<
 && useradd  --uid 1001 --gid appgroup \
             --shell /usr/sbin/nologin \
             --create-home appuser        # <<< crea /home/appuser

RUN chown -R appuser:appgroup /opt/app    # <<<

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:${PORT}/api/health || exit 1  # <<< curl funciona de serie

USER appuser

CMD ["npm", "run", "start:prod"]
