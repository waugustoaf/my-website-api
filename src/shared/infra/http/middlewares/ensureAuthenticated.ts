import { authConfig } from '@config/auth';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.secret_refresh_token,
    ) as IPayload;

    const userToken = await userTokensRepository.findByUserAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: userToken.user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
};
