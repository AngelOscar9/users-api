import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import { LoggerService } from './config/logger.js';
import { apiReference } from '@scalar/express-api-reference';

const app = express();
const logger = new LoggerService('App');

app.use(bodyParser.json());
app.use('/api', routes);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Pino logger
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Scalar UI
app.use(
  '/reference',
  apiReference({
    spec: {
      content: swaggerSpec,
    },
  }),
);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid JSON payload',
      });
    }
    next(err);
  });
export default app;
