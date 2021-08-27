import {
  IDateProvider,
} from '../IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BackToDateDTO } from '@modules/accounts/dtos/date/BackToDateDTO';
import { CountTimeDTO } from '@modules/accounts/dtos/date/CountTimeDTO';
import { AddFromNowDTO } from '@modules/accounts/dtos/date/AddFromNowDTO';

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  backToDate({ months, years }: BackToDateDTO): Date {
    let responseDate = dayjs().toDate();

    if (months) {
      responseDate = dayjs(responseDate)
        .add(months * -1, 'months')
        .toDate();
    }

    if (years) {
      responseDate = dayjs(responseDate)
        .add(years * -1, 'years')
        .toDate();
    }

    return responseDate;
  }

  hasSameYear(first_date: Date, second_date: Date): boolean {
    const isSame = dayjs(first_date).diff(second_date, 'years') === 0;

    return isSame;
  }

  hasSameMonth(first_date: Date, second_date: Date): boolean {
    const isSame = dayjs(first_date).diff(second_date, 'months') === 0;

    return isSame;
  }

  dateNow(): Date {
    const dateNow = dayjs().toDate();

    return dateNow;
  }

  countTime({ end_date, start_date, type = 'years' }: CountTimeDTO): number {
    const distance = dayjs(end_date).diff(start_date, type);

    return distance;
  }

  addFromNow({ quantity, type = 'days' }: AddFromNowDTO): Date {
    const response = dayjs().add(quantity, type).toDate();

    return response;
  }
}
