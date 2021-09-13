"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProjectController = void 0;

var _tsyringe = require("tsyringe");

var _CreateProjectUseCase = require("./CreateProjectUseCase");

class CreateProjectController {
  async handle(request, response) {
    const {
      external_link,
      github_link,
      image_link,
      name,
      description
    } = request.body;

    const createProjectUseCase = _tsyringe.container.resolve(_CreateProjectUseCase.CreateProjectUseCase);

    const project = await createProjectUseCase.execute({
      external_link,
      github_link,
      image_link,
      name,
      description
    });
    return response.json(project);
  }

}

exports.CreateProjectController = CreateProjectController;