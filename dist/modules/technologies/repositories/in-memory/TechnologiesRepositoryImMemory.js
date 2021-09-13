"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TechnologiesRepositoryInMemory = void 0;

var _Technology = require("../../infra/typeorm/entities/Technology");

class TechnologiesRepositoryInMemory {
  constructor() {
    this.technologies = [];
  }

  async create(data) {
    const technology = new _Technology.Technology();
    Object.assign(technology, data);
    this.technologies.push(technology);
    return technology;
  }

  async findByName(name) {
    const technology = this.technologies.find(technology => technology.name === name);
    return technology;
  }

  async list() {
    return this.technologies;
  }

}

exports.TechnologiesRepositoryInMemory = TechnologiesRepositoryInMemory;