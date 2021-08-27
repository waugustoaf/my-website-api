import { OpUnitType, QUnitType } from "dayjs";

export interface CountTimeDTO {
  start_date: Date;
  end_date: Date;
  type?: QUnitType | OpUnitType;
}
