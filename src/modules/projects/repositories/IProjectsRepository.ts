import { ICreateProjectDTO } from '../dtos/ICreateProjectDTO';
import { Project } from '../infra/typeorm/entities/Project';

export interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  findAlreadyRegistered(data: ICreateProjectDTO): Promise<Project | undefined>;
  list(): Promise<Project[]>;
}
