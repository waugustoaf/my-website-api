"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UserTokensRepositoryInMemory = require("../../repositories/in-memory/UserTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _BCryptHashProvider = require("../../../../shared/container/providers/HashProvider/implementations/BCryptHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let usersRepositoryInMemory;
let userTokensRepository;
let bcryptHashProvider;
let dayjsDateProvider;
let createUserUseCase;
let authenticateUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepository = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    bcryptHashProvider = new _BCryptHashProvider.BCryptHashProvider();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, bcryptHashProvider);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepository, dayjsDateProvider, bcryptHashProvider);
  });
  it('should be able to authenticate an user with correct credentials', async () => {
    const user = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234'
    };
    await createUserUseCase.execute(user);
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate an user with incorrect password', async () => {
    const user = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrect_password'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to authenticate with a nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'invalid_email',
      password: 'incorrect_password'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
});