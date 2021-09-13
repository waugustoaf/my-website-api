import { TechnologiesRepositoryInMemory } from '@modules/technologies/repositories/in-memory/TechnologiesRepositoryImMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateTechnologyUseCase } from './CreateTechnologyUseCase';

let technologiesRepositoryInMemory: TechnologiesRepositoryInMemory;
let dayjsDateProvider: IDateProvider;
let createTechnologyUseCase: CreateTechnologyUseCase;

describe('Create Technology', () => {
  beforeEach(() => {
    technologiesRepositoryInMemory = new TechnologiesRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createTechnologyUseCase = new CreateTechnologyUseCase(
      technologiesRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be able to create a new technology', async () => {
    const technology = await createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 0,
      time_in_years: 1,
      type: 'mobile',
    });

    await createTechnologyUseCase.execute({
      name: 'Tech name secondary',
      time_in_months: 2,
      time_in_years: 2,
      type: 'mobile',
    });

    expect(technology).toHaveProperty('id');
  });

  it('it should not be able to create a duplicated technology', async () => {
    await createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 1,
      time_in_years: 0,
      type: 'web',
    });

    await expect(
      createTechnologyUseCase.execute({
        name: 'Tech name',
        time_in_months: 10,
        time_in_years: 0,
        type: 'web',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new technology without experience time', async () => {
    await expect(
      createTechnologyUseCase.execute({
        name: 'Tech name',
        time_in_months: 0,
        time_in_years: 0,
        type: 'backend',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new technology with invalid type', async () => {
    await expect(
      createTechnologyUseCase.execute({
        name: 'Tech name',
        time_in_months: 0,
        time_in_years: 2,
        type: 'invalid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
