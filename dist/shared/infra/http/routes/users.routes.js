"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _celebrate = require("celebrate");

var _express = require("express");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const createUser = new _CreateUserController.CreateUserController();
userRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _joi.default.string().required(),
    password: _joi.default.string().required(),
    email: _joi.default.string().email().required()
  }
}), createUser.handle);