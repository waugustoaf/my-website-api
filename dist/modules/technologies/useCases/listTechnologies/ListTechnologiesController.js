"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTechnologiesController = void 0;

var _tsyringe = require("tsyringe");

var _ListTechnologiesUseCase = require("./ListTechnologiesUseCase");

class ListTechnologiesController {
  async handle(request, response) {
    const listTechnologiesUseCase = _tsyringe.container.resolve(_ListTechnologiesUseCase.ListTechnologiesUseCase);

    const technologies = await listTechnologiesUseCase.execute();
    return response.json(technologies);
  }

}

exports.ListTechnologiesController = ListTechnologiesController;