import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';

export const userRoutes = Router();

const createUser = new CreateUserController();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  createUser.handle,
);
