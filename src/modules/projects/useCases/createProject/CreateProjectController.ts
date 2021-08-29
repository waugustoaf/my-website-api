import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProjectUseCase } from './CreateProjectUseCase';

export class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { external_link, github_link, image_link, name, description } = request.body;

    const createProjectUseCase = container.resolve(CreateProjectUseCase);

    const project = await createProjectUseCase.execute({
      external_link,
      github_link,
      image_link,
      name,
      description,
    });

    return response.json(project);
  }
}
