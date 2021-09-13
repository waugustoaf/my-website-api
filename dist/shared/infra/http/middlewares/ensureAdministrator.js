"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdministrator = void 0;

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

const ensureAdministrator = async (request, response, next) => {
  const {
    id: user_id
  } = request.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(user_id);

  if (user !== null && user !== void 0 && user.isAdmin) {
    return next();
  } else {
    throw new _AppError.AppError('You must be an administrator');
  }
};

exports.ensureAdministrator = ensureAdministrator;