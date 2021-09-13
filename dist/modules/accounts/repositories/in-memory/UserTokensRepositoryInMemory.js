"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UserTokensRepositoryInMemory {
  constructor() {
    this.userTokens = [];
  }

  async create(data) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, data);
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.userTokens.find(userToken => userToken.refresh_token === refresh_token);
    return userToken;
  }

  async findByUserAndRefreshToken(user_id, refresh_token) {
    const userToken = this.userTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userTokenIndex = await this.userTokens.findIndex(userToken => userToken.id === id);
    this.userTokens.splice(userTokenIndex, 1);
  }

}

exports.UserTokensRepositoryInMemory = UserTokensRepositoryInMemory;