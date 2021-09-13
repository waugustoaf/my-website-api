"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IHashProvider = require("../../../../shared/container/providers/HashProvider/IHashProvider");

var _classTransformer = require("class-transformer");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BCryptHashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserUseCase {
  constructor(usersRepository, bcryptHashProvider) {
    this.usersRepository = usersRepository;
    this.bcryptHashProvider = bcryptHashProvider;
  }

  async execute({
    email,
    name,
    password
  }) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError('An user with this email already exists.');
    }

    const hashedPassword = await this.bcryptHashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });
    return (0, _classTransformer.classToClass)(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;