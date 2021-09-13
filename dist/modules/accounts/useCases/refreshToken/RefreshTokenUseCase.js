"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _auth = require("../../../../config/auth");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(userTokensRepository, dayjsDateProvider) {
    this.userTokensRepository = userTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute(token) {
    const {
      expires_in_refresh_token,
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_token,
      secret_token
    } = _auth.authConfig;
    let email = '',
        sub = '';

    try {
      const {
        email: emailRegister,
        sub: subRegister
      } = (0, _jsonwebtoken.verify)(token, secret_refresh_token);
      email = emailRegister;
      sub = subRegister;
    } catch (err) {
      throw new _AppError.AppError('Invalid Refresh Token');
    }

    const user_id = sub;
    const userToken = await this.userTokensRepository.findByUserAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new _AppError.AppError('Refresh Token does not exists!');
    }

    await this.userTokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token
    });
    const expires_date = this.dayjsDateProvider.addFromNow({
      quantity: expires_refresh_token_days
    });
    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    const newToken = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token
    });
    return {
      refresh_token,
      token: newToken
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;