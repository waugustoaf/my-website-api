"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;

var _User = require("../../infra/typeorm/entities/User");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const user = new _User.User();
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findById(id) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

}

exports.UsersRepositoryInMemory = UsersRepositoryInMemory;