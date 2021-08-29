import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProjectsUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(): Promise<Project[]> {
    const projects = this.projectsRepository.list();

    return projects;
  }
}
