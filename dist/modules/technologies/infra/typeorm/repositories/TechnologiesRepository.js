"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TechnologiesRepository = void 0;

var _typeorm = require("typeorm");

var _Technology = require("../entities/Technology");

class TechnologiesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Technology.Technology);
  }

  async create(data) {
    const technology = this.repository.create(data);
    await this.repository.save(technology);
    return technology;
  }

  async findByName(name) {
    const technology = await this.repository.findOne({
      where: {
        name
      }
    });
    return technology;
  }

  async list() {
    const technologies = await this.repository.find();
    return technologies;
  }

}

exports.TechnologiesRepository = TechnologiesRepository;