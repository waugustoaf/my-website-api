import { ICreateTechnologyDTO } from '@modules/technologies/dtos/ICreateTechnologyDTO';
import { Technology } from '@modules/technologies/infra/typeorm/entities/Technology';
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

type IResponse = { formatted_start_date: string } & Technology;

@injectable()
export class CreateTechnologyUseCase {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  private formatDate(date: Date) {
    const dateNow = this.dayjsDateProvider.dateNow();

    const distanceYears = this.dayjsDateProvider.countTime({
      end_date: dateNow,
      start_date: date,
    });

    const distanceMonths =
      this.dayjsDateProvider.countTime({
        end_date: dateNow,
        start_date: date,
        type: 'months',
      }) -
      distanceYears * 12;

    const formattedYears =
      distanceYears === 0
        ? undefined
        : distanceYears === 1
        ? '1 ano'
        : `${distanceYears} anos`;

    const formattedMonths =
      distanceMonths === 0
        ? undefined
        : distanceMonths === 1
        ? '1 mês'
        : `${distanceMonths} meses`;

    if (!!formattedMonths && !!formattedYears) {
      return `${formattedYears} e ${formattedMonths}`;
    } else {
      if (formattedYears) {
        return `${formattedYears}`;
      } else {
        return `${formattedMonths}`;
      }
    }
  }

  async execute({ name, time_in_months, time_in_years, type }: IRequest): Promise<IResponse> {
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

    const formatted_start_date = this.formatDate(start_date);

    const technology = await this.technologiesRepository.create({
      name,
      start_date,
      type,
    });

    return {...technology, formatted_start_date};
  }
}
