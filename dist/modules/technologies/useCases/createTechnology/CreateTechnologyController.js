"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTechnologyController = void 0;

var _tsyringe = require("tsyringe");

var _CreateTechnologyUseCase = require("./CreateTechnologyUseCase");

class CreateTechnologyController {
  async handle(request, response) {
    const {
      name,
      time_in_months,
      time_in_years,
      type
    } = request.body;

    const createTechnologyUseCase = _tsyringe.container.resolve(_CreateTechnologyUseCase.CreateTechnologyUseCase);

    const technology = await createTechnologyUseCase.execute({
      name,
      time_in_months,
      time_in_years,
      type
    });
    return response.status(201).json(technology);
  }

}

exports.CreateTechnologyController = CreateTechnologyController;