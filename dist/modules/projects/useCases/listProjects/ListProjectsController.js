"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProjectsController = void 0;

var _tsyringe = require("tsyringe");

var _ListProjectsUseCase = require("./ListProjectsUseCase");

class ListProjectsController {
  async handle(request, response) {
    const listProjectsUseCase = _tsyringe.container.resolve(_ListProjectsUseCase.ListProjectsUseCase);

    const projects = await listProjectsUseCase.execute();
    return response.json(projects);
  }

}

exports.ListProjectsController = ListProjectsController;