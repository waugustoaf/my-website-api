"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _projects = require("./projects.routes");

var _technologies = require("./technologies.routes");

var _users = require("./users.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/technologies', _technologies.technologyRoutes);
routes.use('/users', _users.userRoutes);
routes.use('/projects', _projects.projectRoutes);
routes.use(_authenticate.authenticateRoutes);