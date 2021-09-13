"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../entities/UserTokens");

class UserTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async create(data) {
    const userToken = this.repository.create(data);
    await this.repository.save(userToken);
    return userToken;
  }

  async findByRefreshToken(refresh_token) {
    const userToken = await this.repository.findOne({
      where: {
        refresh_token
      }
    });
    return userToken;
  }

  async findByUserAndRefreshToken(user_id, refresh_token) {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token
      }
    });
    return userToken;
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

}

exports.UserTokensRepository = UserTokensRepository;