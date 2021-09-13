import { Technology } from '@modules/technologies/infra/typeorm/entities/Technology';
import { ITechnologiesRepository } from '@modules/technologies/repositories/ITechnologiesRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';

type ResponseItem = { formatted_start_date: string } & Technology;
type IResponse = ResponseItem[];

@injectable()
export class ListTechnologiesUseCase {
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

  private compare(a: Technology, b: Technology) {
    if (a.start_date < b.start_date) {
      return -1;
    }
    if (a.start_date > b.start_date) {
      return 1;
    }
    return 0;
  }

  async execute(): Promise<IResponse> {
    const response = await this.technologiesRepository.list();

    const technologies = response
      .map(technology => ({
        ...technology,
        formatted_start_date: this.formatDate(technology.start_date),
      }))
      .sort(this.compare);

    return technologies;
  }
}
