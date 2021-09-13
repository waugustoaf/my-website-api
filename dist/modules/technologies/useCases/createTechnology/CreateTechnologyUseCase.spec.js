"use strict";

var _TechnologiesRepositoryImMemory = require("../../repositories/in-memory/TechnologiesRepositoryImMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateTechnologyUseCase = require("./CreateTechnologyUseCase");

let technologiesRepositoryInMemory;
let dayjsDateProvider;
let createTechnologyUseCase;
describe('Create Technology', () => {
  beforeEach(() => {
    technologiesRepositoryInMemory = new _TechnologiesRepositoryImMemory.TechnologiesRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createTechnologyUseCase = new _CreateTechnologyUseCase.CreateTechnologyUseCase(technologiesRepositoryInMemory, dayjsDateProvider);
  });
  it('should be able to create a new technology', async () => {
    const technology = await createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 0,
      time_in_years: 1,
      type: 'mobile'
    });
    await createTechnologyUseCase.execute({
      name: 'Tech name secondary',
      time_in_months: 2,
      time_in_years: 2,
      type: 'mobile'
    });
    expect(technology).toHaveProperty('id');
  });
  it('it should not be able to create a duplicated technology', async () => {
    await createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 1,
      time_in_years: 0,
      type: 'web'
    });
    await expect(createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 10,
      time_in_years: 0,
      type: 'web'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new technology without experience time', async () => {
    await expect(createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 0,
      time_in_years: 0,
      type: 'backend'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new technology with invalid type', async () => {
    await expect(createTechnologyUseCase.execute({
      name: 'Tech name',
      time_in_months: 0,
      time_in_years: 2,
      type: 'invalid'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
});