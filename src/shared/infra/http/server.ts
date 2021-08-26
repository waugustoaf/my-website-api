import express, { Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';
import { NextFunction } from 'connect';
import { AppError } from '../../errors/AppError';
import { routes } from './routes';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';
import { errors } from 'celebrate';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

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
  console.log('\x1b[32m', 'Server has started! 🚀');
});
