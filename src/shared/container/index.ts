import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { TechnologiesRepository } from '@modules/technologies/infra/typeorm/repositories/TechnologiesRepository';
import { ITechnologiesRepository } from '@modules/technologies/repositories/ITechnologiesRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<ITechnologiesRepository>(
  'TechnologiesRepository',
  TechnologiesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
