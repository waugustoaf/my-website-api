import { ICreateTechnologyDTO } from '@modules/technologies/dtos/ICreateTechnologyDTO';
import { ITechnologiesRepository } from '@modules/technologies/repositories/ITechnologiesRepository';
import { getRepository, Repository } from 'typeorm';
import { Technology } from '../entities/Technology';

export class TechnologiesRepository implements ITechnologiesRepository {
  private repository: Repository<Technology>;

  constructor() {
    this.repository = getRepository(Technology);
  }

  async create(data: ICreateTechnologyDTO): Promise<Technology> {
    const technology = this.repository.create(data);

    await this.repository.save(technology);

    return technology;
  }

  async findByName(name: string): Promise<Technology | undefined> {
    const technology = await this.repository.findOne({
      where: {
        name,
      },
    });

    return technology;
  }

  async list(): Promise<Technology[]> {
    const technologies = await this.repository.find();

    return technologies;
  }
}
