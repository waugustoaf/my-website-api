"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UserTokensRepositoryInMemory = require("../../repositories/in-memory/UserTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _BCryptHashProvider = require("../../../../shared/container/providers/HashProvider/implementations/BCryptHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _AuthenticateUserUseCase = require("../authenticateUser/AuthenticateUserUseCase");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _RefreshTokenUseCase = require("./RefreshTokenUseCase");

let usersRepositoryInMemory;
let userTokensRepository;
let bcryptHashProvider;
let dayjsDateProvider;
let createUserUseCase;
let authenticateUserUseCase;
let refreshTokenUseCase;
describe('Refresh Token', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepository = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    bcryptHashProvider = new _BCryptHashProvider.BCryptHashProvider();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, bcryptHashProvider);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepository, dayjsDateProvider, bcryptHashProvider);
    refreshTokenUseCase = new _RefreshTokenUseCase.RefreshTokenUseCase(userTokensRepository, dayjsDateProvider);
  });
  it('should be able to refresh a valid token', async () => {
    const user = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234'
    };
    await createUserUseCase.execute(user);
    const {
      refresh_token
    } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    const newToken = await refreshTokenUseCase.execute(refresh_token);
    expect(newToken).toHaveProperty('token');
    expect(newToken).toHaveProperty('refresh_token');
  });
  it('should not be able to refresh an invalid token', async () => {
    await expect(refreshTokenUseCase.execute('invalid_token')).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to refresh with an expired token', async () => {
    await expect(refreshTokenUseCase.execute('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdWd1c3RvYWZAZ21haWwuY29tIiwiaWF0IjoxNjMwMTAxNDY5LCJleHAiOjE2MzI2OTM0NjksInN1YiI6IjQwOTI2ZTM2LThkNGEtNGFiYi1hMmFlLThhZTQ5NWE1YjI4OSJ9.6X9H-zIDXs7eyRdtgqzOzYroZa5a7oHd3VBuB2VyEXQ')).rejects.toBeInstanceOf(_AppError.AppError);
  });
});