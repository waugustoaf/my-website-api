"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectRoutes = void 0;

var _CreateProjectController = require("../../../../modules/projects/useCases/createProject/CreateProjectController");

var _ListProjectsController = require("../../../../modules/projects/useCases/listProjects/ListProjectsController");

var _celebrate = require("celebrate");

var _express = require("express");

var _ensureAdministrator = require("../middlewares/ensureAdministrator");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const projectRoutes = (0, _express.Router)();
exports.projectRoutes = projectRoutes;
const createProject = new _CreateProjectController.CreateProjectController();
const listProjects = new _ListProjectsController.ListProjectsController();
projectRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdministrator.ensureAdministrator, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().min(15).required(),
    external_link: _celebrate.Joi.string().uri().required(),
    github_link: _celebrate.Joi.string().uri().required(),
    image_link: _celebrate.Joi.string().uri().required()
  }
}), createProject.handle);
projectRoutes.get('/', listProjects.handle);