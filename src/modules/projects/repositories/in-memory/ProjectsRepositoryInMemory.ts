import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '../IProjectsRepository';

export class ProjectsRepositoryInMemory implements IProjectsRepository {
  private projects: Project[] = [];

  async create(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, data);

    this.projects.push(project);

    return project;
  }

  async findAlreadyRegistered(
    data: ICreateProjectDTO,
  ): Promise<Project | undefined> {
    const { external_link, github_link, name } = data;
    const project = this.projects.find(
      project =>
        project.external_link === external_link ||
        project.github_link === github_link ||
        project.name === name,
    );

    return project;
  }

  async list(): Promise<Project[]> {
    return this.projects;
  }
}
