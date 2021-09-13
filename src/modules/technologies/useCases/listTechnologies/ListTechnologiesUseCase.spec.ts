import { TechnologiesRepositoryInMemory } from '@modules/technologies/repositories/in-memory/TechnologiesRepositoryImMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateTechnologyUseCase } from '../createTechnology/CreateTechnologyUseCase';
import { ListTechnologiesUseCase } from './ListTechnologiesUseCase';

let technologiesRepositoryInMemory: TechnologiesRepositoryInMemory;
let dayjsDateProvider: IDateProvider;
let createTechnologyUseCase: CreateTechnologyUseCase;
let listTechnologiesUseCase: ListTechnologiesUseCase;

describe('List Technologies', () => {
  beforeEach(() => {
    technologiesRepositoryInMemory = new TechnologiesRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createTechnologyUseCase = new CreateTechnologyUseCase(
      technologiesRepositoryInMemory,
      dayjsDateProvider,
    );
    listTechnologiesUseCase = new ListTechnologiesUseCase(
      technologiesRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be able to list technologies', async () => {
    const technologyOne = await createTechnologyUseCase.execute({
      name: 'Tech name one',
      time_in_months: 1,
      time_in_years: 2,
      type: 'mobile',
    });

    const technologyTwo = await createTechnologyUseCase.execute({
      name: 'Tech name two',
      time_in_months: 0,
      time_in_years: 1,
      type: 'mobile',
    });

    const technologyThree = await createTechnologyUseCase.execute({
      name: 'Tech name three',
      time_in_months: 1,
      time_in_years: 0,
      type: 'mobile',
    });

    const technologies = await listTechnologiesUseCase.execute();

    expect(technologies).toEqual([
      technologyOne,
      technologyTwo,
      technologyThree,
    ]);
  });
});
