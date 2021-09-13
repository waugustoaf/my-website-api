"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

class AppError {
  constructor(message, status = 400) {
    this.status = void 0;
    this.message = void 0;
    this.status = status;
    this.message = message;
  }

}

exports.AppError = AppError;