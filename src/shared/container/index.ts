import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
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

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);
