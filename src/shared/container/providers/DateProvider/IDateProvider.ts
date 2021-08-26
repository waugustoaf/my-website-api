import { OpUnitType, QUnitType } from "dayjs";

export interface BackToDate {
  years?: number;
  months?: number;
}

export interface CountTime {
  start_date: Date;
  end_date: Date;
  type?: QUnitType | OpUnitType;
}

export interface IDateProvider {
  backToDate(data: BackToDate): Date;
  hasSameYear(first_date: Date, second_date: Date): boolean;
  hasSameMonth(first_date: Date, second_date: Date): boolean;
  dateNow(): Date;
  countTime({ end_date, start_date }: CountTime): number;
}
