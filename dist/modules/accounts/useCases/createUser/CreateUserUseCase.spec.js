"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _BCryptHashProvider = require("../../../../shared/container/providers/HashProvider/implementations/BCryptHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateUserUseCase = require("./CreateUserUseCase");

let usersRepositoryInMemory;
let bcryptHashProvider;
let createUserUseCase;
describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    bcryptHashProvider = new _BCryptHashProvider.BCryptHashProvider();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, bcryptHashProvider);
  });
  it('should be able to create a new user', async () => {
    const createUserData = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234'
    };
    const user = await createUserUseCase.execute(createUserData);
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create an already existent user', async () => {
    const createUserData = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '1234'
    };
    await createUserUseCase.execute(createUserData);
    await expect(createUserUseCase.execute(createUserData)).rejects.toBeInstanceOf(_AppError.AppError);
  });
});