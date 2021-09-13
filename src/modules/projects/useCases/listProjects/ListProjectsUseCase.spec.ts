import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateProjectUseCase } from '../createProject/CreateProjectUseCase';
import { ListProjectsUseCase } from './ListProjectsUseCase';

let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let createProjectUseCase: CreateProjectUseCase;
let listProjectsUseCase: ListProjectsUseCase;

describe('Create Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(projectsRepositoryInMemory);
    listProjectsUseCase = new ListProjectsUseCase(projectsRepositoryInMemory);
  });

  it('should be able to list projects', async () => {
    const createProjectData: ICreateProjectDTO = {
      description: 'A project 2',
      external_link: 'https://externallink.com.br',
      github_link: 'https://github.com/waugustoaf/repository',
      image_link: 'https://i.imgur.com/skadn89a',
      name: 'Project name 1',
    };

    const project_one = await createProjectUseCase.execute(
      createProjectData,
    );

    const projects = await listProjectsUseCase.execute();

    expect(projects).toEqual([project_one]);
  });
});
