import pino from 'pino';

export class LoggerService {
  constructor(context = 'App') {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: true,
          ignore: 'pid,hostname',
        },
      },
      base: undefined,
    });
  }

  info(message, data = {}) {
    this.logger.info(data, message);
  }

  error(message, data = {}) {
    this.logger.error(data, message);
  }

  warn(message, data = {}) {
    this.logger.warn(data, message);
  }
}
