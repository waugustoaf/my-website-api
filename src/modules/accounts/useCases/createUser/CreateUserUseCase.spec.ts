import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let bcryptHashProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    bcryptHashProvider = new BCryptHashProvider();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      bcryptHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234',
    };

    const user = await createUserUseCase.execute(createUserData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an already existent user', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(createUserData);

    await expect(
      createUserUseCase.execute(createUserData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
