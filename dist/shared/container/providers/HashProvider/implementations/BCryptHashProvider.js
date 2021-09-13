"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCryptHashProvider = void 0;

var _bcrypt = require("bcrypt");

class BCryptHashProvider {
  async generateHash(payload) {
    const hashedPayload = await (0, _bcrypt.hash)(payload, 8);
    return hashedPayload;
  }

  async compareHash(payload, hashed) {
    const isSamePayload = await (0, _bcrypt.compare)(payload, hashed);
    return isSamePayload;
  }

}

exports.BCryptHashProvider = BCryptHashProvider;