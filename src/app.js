import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import logger from './config/logger.js';
import { apiReference } from '@scalar/express-api-reference';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Pino logger
app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url });
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

export default app;
