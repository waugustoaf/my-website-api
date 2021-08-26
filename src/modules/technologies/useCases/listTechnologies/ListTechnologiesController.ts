import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTechnologiesUseCase } from './ListTechnologiesUseCase';

export class ListTechnologiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTechnologiesUseCase = container.resolve(ListTechnologiesUseCase);

    const technologies = await listTechnologiesUseCase.execute();

    return response.json(technologies);
  }
}
