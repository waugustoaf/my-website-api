import { AddFromNowDTO } from '@modules/accounts/dtos/date/AddFromNowDTO';
import { BackToDateDTO } from '@modules/accounts/dtos/date/BackToDateDTO';
import { CountTimeDTO } from '@modules/accounts/dtos/date/CountTimeDTO';

export interface IDateProvider {
  backToDate(data: BackToDateDTO): Date;
  hasSameYear(first_date: Date, second_date: Date): boolean;
  hasSameMonth(first_date: Date, second_date: Date): boolean;
  dateNow(): Date;
  countTime({ end_date, start_date }: CountTimeDTO): number;
  addFromNow({}: AddFromNowDTO): Date;
}
