import express, { Express, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig, rateLimiterConfig } from './settings';
import { errorHandler } from './middlewares/errors';
import NotFoundError from './errors/NotFoundError';
import 'express-async-errors';
import apiV1 from './api/v1';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
const version = process.env.API_VERSION || 'v1';

app.use(helmet());
app.use(cors(corsConfig));
app.use(rateLimit(rateLimiterConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.use(`/api/${version}`, apiV1);

app.all('*', (req) => {
    console.error('Route not found: ', req.originalUrl);
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
