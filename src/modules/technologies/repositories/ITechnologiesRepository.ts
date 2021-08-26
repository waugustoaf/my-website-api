import { ICreateTechnologyDTO } from '../dtos/ICreateTechnologyDTO';
import { Technology } from '../infra/typeorm/entities/Technology';

export interface ITechnologiesRepository {
  create(data: ICreateTechnologyDTO): Promise<Technology>;
  findByName(name: string): Promise<Technology | undefined>;
  list(): Promise<Technology[]>;
}
