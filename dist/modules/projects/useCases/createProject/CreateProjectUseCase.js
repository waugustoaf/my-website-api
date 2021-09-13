"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProjectUseCase = void 0;

var _IProjectsRepository = require("../../repositories/IProjectsRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateProjectUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProjectsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProjectsRepository.IProjectsRepository === "undefined" ? Object : _IProjectsRepository.IProjectsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateProjectUseCase {
  constructor(projectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  async execute(data) {
    const {
      external_link,
      github_link,
      name
    } = data;
    const projectAlreadyExists = await this.projectsRepository.findAlreadyRegistered(data);

    if (projectAlreadyExists) {
      if (external_link === projectAlreadyExists.external_link) {
        throw new _AppError.AppError('External link already registered.');
      }

      if (github_link === projectAlreadyExists.github_link) {
        throw new _AppError.AppError('GitHub project already registered.');
      }

      if (name === projectAlreadyExists.name) {
        throw new _AppError.AppError('Project with this name already registered.');
      }
    }

    const project = await this.projectsRepository.create(data);
    return project;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateProjectUseCase = CreateProjectUseCase;