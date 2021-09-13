"use strict";

var _ProjectsRepositoryInMemory = require("../../repositories/in-memory/ProjectsRepositoryInMemory");

var _CreateProjectUseCase = require("../createProject/CreateProjectUseCase");

var _ListProjectsUseCase = require("./ListProjectsUseCase");

let projectsRepositoryInMemory;
let createProjectUseCase;
let listProjectsUseCase;
describe('Create Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new _ProjectsRepositoryInMemory.ProjectsRepositoryInMemory();
    createProjectUseCase = new _CreateProjectUseCase.CreateProjectUseCase(projectsRepositoryInMemory);
    listProjectsUseCase = new _ListProjectsUseCase.ListProjectsUseCase(projectsRepositoryInMemory);
  });
  it('should be able to list projects', async () => {
    const createProjectData = {
      description: 'A project 2',
      external_link: 'https://externallink.com.br',
      github_link: 'https://github.com/waugustoaf/repository',
      image_link: 'https://i.imgur.com/skadn89a',
      name: 'Project name 1'
    };
    const project_one = await createProjectUseCase.execute(createProjectData);
    const projects = await listProjectsUseCase.execute();
    expect(projects).toEqual([project_one]);
  });
});