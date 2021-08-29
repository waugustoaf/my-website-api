import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { getRepository, Repository } from 'typeorm';
import { Project } from '../entities/Project';

export class ProjectsRepository implements IProjectsRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = getRepository(Project);
  }

  async create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.repository.create(data);

    await this.repository.save(project);

    return project;
  }

  async findAlreadyRegistered({
    external_link,
    github_link,
    name,
  }: ICreateProjectDTO): Promise<Project | undefined> {
    const project = await this.repository.findOne({
      where: [{ external_link }, { github_link }, { name }],
    });

    return project;
  }

  async list(): Promise<Project[]> {
    const projects = await this.repository.find();

    return projects;
  }
}
