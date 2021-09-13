"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProjectsUseCase = void 0;

var _IProjectsRepository = require("../../repositories/IProjectsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListProjectsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProjectsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProjectsRepository.IProjectsRepository === "undefined" ? Object : _IProjectsRepository.IProjectsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProjectsUseCase {
  constructor(projectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  compare(a, b) {
    if (a.created_at < b.created_at) {
      return -1;
    }

    if (a.created_at > b.created_at) {
      return 1;
    }

    return 0;
  }

  async execute() {
    const response = await this.projectsRepository.list();
    const projects = response.sort(this.compare);
    return projects;
  }

}) || _class) || _class) || _class) || _class);
exports.ListProjectsUseCase = ListProjectsUseCase;