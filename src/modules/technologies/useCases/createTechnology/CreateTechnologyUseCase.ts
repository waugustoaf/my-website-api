import { ICreateTechnologyDTO } from '@modules/technologies/dtos/ICreateTechnologyDTO';
import { ITechnologiesRepository } from '@modules/technologies/repositories/ITechnologiesRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  time_in_months: number;
  time_in_years: number;
  type: string;
}

@injectable()
export class CreateTechnologyUseCase {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute({ name, time_in_months, time_in_years, type }: IRequest) {
    const technologyAlreadyExits = await this.technologiesRepository.findByName(
      name,
    );

    if (technologyAlreadyExits) {
      throw new AppError('A technology with this name is already registered.');
    }

    if (type !== 'backend' && type !== 'mobile' && type !== 'web') {
      throw new AppError(
        `Invalid technology type. Please check requirements at ${process.env.DOCS_URL}`,
      );
    }

    if (time_in_months === 0 && time_in_years === 0) {
      throw new AppError(
        'You must have at least one month of technology experience.',
      );
    }

    const start_date = this.dayjsDateProvider.backToDate({
      months: time_in_months,
      years: time_in_years,
    });

    const technology = await this.technologiesRepository.create({
      name,
      start_date,
      type,
    });

    return technology;
  }
}
