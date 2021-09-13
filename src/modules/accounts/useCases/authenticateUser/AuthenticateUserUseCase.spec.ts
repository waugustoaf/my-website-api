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
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let userTokensRepository: IUserTokensRepository;
let bcryptHashProvider: IHashProvider;
let dayjsDateProvider: IDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepository = new UserTokensRepositoryInMemory();
    bcryptHashProvider = new BCryptHashProvider();
    dayjsDateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      bcryptHashProvider,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepository,
      dayjsDateProvider,
      bcryptHashProvider,
    );
  });

  it('should be able to authenticate an user with correct credentials', async () => {
    const user: ICreateUserDTO = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid_email',
        password: 'incorrect_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
