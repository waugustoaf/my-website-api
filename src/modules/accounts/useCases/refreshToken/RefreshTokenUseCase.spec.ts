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
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let usersRepositoryInMemory: IUsersRepository;
let userTokensRepository: IUserTokensRepository;
let bcryptHashProvider: IHashProvider;
let dayjsDateProvider: IDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe('Refresh Token', () => {
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
    refreshTokenUseCase = new RefreshTokenUseCase(
      userTokensRepository,
      dayjsDateProvider,
    );
  });

  it('should be able to refresh a valid token', async () => {
    const user: ICreateUserDTO = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const newToken = await refreshTokenUseCase.execute(refresh_token);

    expect(newToken).toHaveProperty('token');
    expect(newToken).toHaveProperty('refresh_token');
  });

  it('should not be able to refresh an invalid token', async () => {
    await expect(
      refreshTokenUseCase.execute('invalid_token'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to refresh with an expired token', async () => {
    await expect(
      refreshTokenUseCase.execute(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdWd1c3RvYWZAZ21haWwuY29tIiwiaWF0IjoxNjMwMTAxNDY5LCJleHAiOjE2MzI2OTM0NjksInN1YiI6IjQwOTI2ZTM2LThkNGEtNGFiYi1hMmFlLThhZTQ5NWE1YjI4OSJ9.6X9H-zIDXs7eyRdtgqzOzYroZa5a7oHd3VBuB2VyEXQ',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
