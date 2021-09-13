"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectsRepository = void 0;

var _typeorm = require("typeorm");

var _Project = require("../entities/Project");

class ProjectsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Project.Project);
  }

  async create(data) {
    const project = this.repository.create(data);
    await this.repository.save(project);
    return project;
  }

  async findAlreadyRegistered({
    external_link,
    github_link,
    name
  }) {
    const project = await this.repository.findOne({
      where: [{
        external_link
      }, {
        github_link
      }, {
        name
      }]
    });
    return project;
  }

  async list() {
    const projects = await this.repository.find();
    return projects;
  }

}

exports.ProjectsRepository = ProjectsRepository;