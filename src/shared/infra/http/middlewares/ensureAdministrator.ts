import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export const ensureAdministrator = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id: user_id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (user?.isAdmin) {
    return next();
  } else {
    throw new AppError('You must be an administrator');
  }
};
