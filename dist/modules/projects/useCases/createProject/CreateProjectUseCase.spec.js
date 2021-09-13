"use strict";

var _ProjectsRepositoryInMemory = require("../../repositories/in-memory/ProjectsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateProjectUseCase = require("./CreateProjectUseCase");

let projectsRepositoryInMemory;
let createProjectUseCase;
describe('Create Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new _ProjectsRepositoryInMemory.ProjectsRepositoryInMemory();
    createProjectUseCase = new _CreateProjectUseCase.CreateProjectUseCase(projectsRepositoryInMemory);
  });
  it('should be able to create a new project', async () => {
    const createProjectData = {
      description: 'A project',
      external_link: 'https://externallink.com.br',
      github_link: 'https://github.com/waugustoaf/repository',
      image_link: 'https://i.imgur.com/skadn89a',
      name: 'Project name'
    };
    const project = await createProjectUseCase.execute(createProjectData);
    expect(project).toHaveProperty('id');
  });
  it('should not be able to create a new project with same name', async () => {
    await createProjectUseCase.execute({
      description: 'A project',
      external_link: 'external 1',
      github_link: 'github 1',
      image_link: 'image 1',
      name: 'Same name'
    });
    await expect(createProjectUseCase.execute({
      description: 'A project',
      external_link: 'image 2',
      github_link: 'image 2',
      image_link: 'image 2',
      name: 'Same name'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new project with same github link', async () => {
    await createProjectUseCase.execute({
      description: 'A project',
      external_link: 'external 1',
      github_link: 'Same Github',
      image_link: 'image 1',
      name: 'name 1'
    });
    await expect(createProjectUseCase.execute({
      description: 'A project',
      external_link: 'image 2',
      github_link: 'Same Github',
      image_link: 'image 2',
      name: 'name 2'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new project with same external link', async () => {
    await createProjectUseCase.execute({
      description: 'A project',
      external_link: 'Same external',
      github_link: 'github 1',
      image_link: 'image 1',
      name: 'name 1'
    });
    await expect(createProjectUseCase.execute({
      description: 'A project',
      external_link: 'Same external',
      github_link: 'image 2',
      image_link: 'image 2',
      name: 'name 2'
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
});