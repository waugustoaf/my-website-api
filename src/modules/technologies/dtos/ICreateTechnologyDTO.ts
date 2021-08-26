export interface ICreateTechnologyDTO {
  name: string;
  type: 'web' | 'mobile' | 'backend';
  start_date: Date;
}