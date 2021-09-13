"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = void 0;

var _auth = require("../../../../config/auth");

var _AppError = require("../../../errors/AppError");

var _jsonwebtoken = require("jsonwebtoken");

const ensureAuthenticated = async (request, _, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError('JWT Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.authConfig.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError('Invalid JWT Token', 401);
  }
};

exports.ensureAuthenticated = ensureAuthenticated;