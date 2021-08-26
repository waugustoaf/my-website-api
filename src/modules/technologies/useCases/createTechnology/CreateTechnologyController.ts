import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTechnologyUseCase } from './CreateTechnologyUseCase';

export class CreateTechnologyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, time_in_months, time_in_years, type } = request.body;

    const createTechnologyUseCase = container.resolve(CreateTechnologyUseCase);

    const technology = await createTechnologyUseCase.execute({
      name,
      time_in_months,
      time_in_years,
      type,
    });

    return response.status(201).json(technology);
  }
}
