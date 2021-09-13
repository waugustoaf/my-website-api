"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.technologyRoutes = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _CreateTechnologyController = require("../../../../modules/technologies/useCases/createTechnology/CreateTechnologyController");

var _ListTechnologiesController = require("../../../../modules/technologies/useCases/listTechnologies/ListTechnologiesController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdministrator = require("../middlewares/ensureAdministrator");

const technologyRoutes = (0, _express.Router)();
exports.technologyRoutes = technologyRoutes;
const createTechnology = new _CreateTechnologyController.CreateTechnologyController();
const listTechnologies = new _ListTechnologiesController.ListTechnologiesController();
technologyRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdministrator.ensureAdministrator, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    type: _celebrate.Joi.string().required(),
    time_in_months: _celebrate.Joi.number().required(),
    time_in_years: _celebrate.Joi.number().required()
  }
}), createTechnology.handle);
technologyRoutes.get('/', listTechnologies.handle);