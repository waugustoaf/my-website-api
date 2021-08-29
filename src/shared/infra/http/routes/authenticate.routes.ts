import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), authenticateUserController.handle);

authenticateRoutes.post('/refresh-token', celebrate({
  [Segments.BODY]: {
    token: Joi.string().required()
  }
}), refreshTokenController.handle);
