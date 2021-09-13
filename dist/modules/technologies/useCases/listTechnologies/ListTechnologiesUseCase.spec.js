"use strict";

var _TechnologiesRepositoryImMemory = require("../../repositories/in-memory/TechnologiesRepositoryImMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _CreateTechnologyUseCase = require("../createTechnology/CreateTechnologyUseCase");

var _ListTechnologiesUseCase = require("./ListTechnologiesUseCase");

let technologiesRepositoryInMemory;
let dayjsDateProvider;
let createTechnologyUseCase;
let listTechnologiesUseCase;
describe('List Technologies', () => {
  beforeEach(() => {
    technologiesRepositoryInMemory = new _TechnologiesRepositoryImMemory.TechnologiesRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createTechnologyUseCase = new _CreateTechnologyUseCase.CreateTechnologyUseCase(technologiesRepositoryInMemory, dayjsDateProvider);
    listTechnologiesUseCase = new _ListTechnologiesUseCase.ListTechnologiesUseCase(technologiesRepositoryInMemory, dayjsDateProvider);
  });
  it('should be able to list technologies', async () => {
    const technologyOne = await createTechnologyUseCase.execute({
      name: 'Tech name one',
      time_in_months: 1,
      time_in_years: 2,
      type: 'mobile'
    });
    const technologyTwo = await createTechnologyUseCase.execute({
      name: 'Tech name two',
      time_in_months: 0,
      time_in_years: 1,
      type: 'mobile'
    });
    const technologyThree = await createTechnologyUseCase.execute({
      name: 'Tech name three',
      time_in_months: 1,
      time_in_years: 0,
      type: 'mobile'
    });
    const technologies = await listTechnologiesUseCase.execute();
    expect(technologies).toEqual([technologyOne, technologyTwo, technologyThree]);
  });
});