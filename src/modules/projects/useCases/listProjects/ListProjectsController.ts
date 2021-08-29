import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProjectsUseCase } from './ListProjectsUseCase';

export class ListProjectsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProjectsUseCase = container.resolve(ListProjectsUseCase);

    const projects = await listProjectsUseCase.execute();

    return response.json(projects);
  }
}
