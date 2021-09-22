import '@shared/container';
import createConnection from '@shared/infra/typeorm';
import { errors } from 'celebrate';
import { NextFunction } from 'connect';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import { rateLimiter } from './middlewares/rateLimiter';
import { routes } from './routes';

createConnection();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_ALLOWED_URL,
  }),
);
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.status)
        .json({ status: 'Error', message: error.message });
    } else {
      console.log(error);

      return response.status(500).json({
        status: 'Error',
        message: `INTERNAL SERVER ERROR (${error.message})`,
      });
    }
  },
);

app.listen(3333, () => {
  console.log('\x1b[32m', 'Server has started! 🚀\x1b[37m');
});
