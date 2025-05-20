import app from './app.js';
import config from './config/index.js';
import sequelize from './database/index.js';
import { LoggerService } from './config/logger.js';

const logger = new LoggerService('Server');

const startServer = async () => {
  try {
    await sequelize.sync();
    logger.info('Database synced successfully');
    
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Error starting server', { error });
  }
};

startServer();
