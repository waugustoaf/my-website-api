import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: ICreateProjectDTO): Promise<Project> {
    const { external_link, github_link, name } = data;

    const projectAlreadyExists =
      await this.projectsRepository.findAlreadyRegistered(data);

    if (projectAlreadyExists) {
      if (external_link === projectAlreadyExists.external_link) {
        throw new AppError('External link already registered.');
      }
      if (github_link === projectAlreadyExists.github_link) {
        throw new AppError('GitHub project already registered.');
      }
      if (name === projectAlreadyExists.name) {
        throw new AppError('Project with this name already registered.');
      }
    }

    const project = await this.projectsRepository.create(data);

    return project;
  }
}
