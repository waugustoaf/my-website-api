"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _auth = require("../../../../config/auth");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _IHashProvider = require("../../../../shared/container/providers/HashProvider/IHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _jsonwebtoken = require("jsonwebtoken");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('BCryptHashProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, userTokensRepository, dayjsDateProvider, bcryptHashProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.bcryptHashProvider = bcryptHashProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError('Email or password incorrect');
    }

    const passwordMatch = await this.bcryptHashProvider.compareHash(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError('Email or password incorrect');
    }

    const {
      expires_in_refresh_token,
      expires_in_token,
      expires_refresh_token_days,
      secret_refresh_token,
      secret_token
    } = _auth.authConfig;
    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });
    const expires_date = this.dayjsDateProvider.addFromNow({
      quantity: expires_refresh_token_days
    });
    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id
    });
    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;