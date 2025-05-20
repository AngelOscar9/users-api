import app from './app.js';
import config from './config/index.js';
import sequelize from './database/index.js';

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced');
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

startServer();
