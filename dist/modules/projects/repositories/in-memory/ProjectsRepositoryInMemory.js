"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectsRepositoryInMemory = void 0;

var _Project = require("../../infra/typeorm/entities/Project");

class ProjectsRepositoryInMemory {
  constructor() {
    this.projects = [];
  }

  async create(data) {
    const project = new _Project.Project();
    Object.assign(project, data);
    this.projects.push(project);
    return project;
  }

  async findAlreadyRegistered(data) {
    const {
      external_link,
      github_link,
      name
    } = data;
    const project = this.projects.find(project => project.external_link === external_link || project.github_link === github_link || project.name === name);
    return project;
  }

  async list() {
    return this.projects;
  }

}

exports.ProjectsRepositoryInMemory = ProjectsRepositoryInMemory;