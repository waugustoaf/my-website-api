"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      email,
      name,
      password
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    const user = await createUserUseCase.execute({
      email,
      name,
      password
    });
    return response.json(user);
  }

}

exports.CreateUserController = CreateUserController;