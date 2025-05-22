import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import { LoggerService } from './config/logger.js';

const app = express();
const logger = new LoggerService('App');

app.use(bodyParser.json());
app.use('/api', routes);

app.set('trust proxy', true)
app.get('/api/docs/swagger.json', (req, res) => {
  const specWithHost = {
    ...swaggerSpec,
    servers: [
      { url: `${req.protocol}://${req.get('host')}/api` }
    ]
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(specWithHost);
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/api/docs/swagger.json',
  },
  explorer: true,
}));

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

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
