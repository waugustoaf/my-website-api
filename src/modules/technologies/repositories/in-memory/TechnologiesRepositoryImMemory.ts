import { ICreateTechnologyDTO } from '@modules/technologies/dtos/ICreateTechnologyDTO';
import { Technology } from '@modules/technologies/infra/typeorm/entities/Technology';
import { ITechnologiesRepository } from '../ITechnologiesRepository';

export class TechnologiesRepositoryInMemory implements ITechnologiesRepository {
  private technologies: Technology[] = [];

  async create(data: ICreateTechnologyDTO): Promise<Technology> {
    const technology = new Technology();

    Object.assign(technology, data);

    this.technologies.push(technology);

    return technology;
  }

  async findByName(name: string): Promise<Technology | undefined> {
    const technology = this.technologies.find(
      technology => technology.name === name,
    );

    return technology;
  }

  async list(): Promise<Technology[]> {
    return this.technologies;
  }
}
