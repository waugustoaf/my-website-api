import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProjectsUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  private compare(a: Project, b: Project) {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  }

  async execute(): Promise<Project[]> {
    const response = await this.projectsRepository.list();

    const projects = response.sort(this.compare);

    return projects;
  }
}
