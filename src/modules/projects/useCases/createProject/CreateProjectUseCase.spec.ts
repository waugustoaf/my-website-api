import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateProjectUseCase } from './CreateProjectUseCase';

let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let createProjectUseCase: CreateProjectUseCase;

describe('Create Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(projectsRepositoryInMemory);
  });

  it('should be able to create a new project', async () => {
    const createProjectData: ICreateProjectDTO = {
      description: 'A project',
      external_link: 'https://externallink.com.br',
      github_link: 'https://github.com/waugustoaf/repository',
      image_link: 'https://i.imgur.com/skadn89a',
      name: 'Project name',
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
      name: 'Same name',
    });

    await expect(
      createProjectUseCase.execute({
        description: 'A project',
        external_link: 'image 2',
        github_link: 'image 2',
        image_link: 'image 2',
        name: 'Same name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new project with same github link', async () => {
    await createProjectUseCase.execute({
      description: 'A project',
      external_link: 'external 1',
      github_link: 'Same Github',
      image_link: 'image 1',
      name: 'name 1',
    });

    await expect(
      createProjectUseCase.execute({
        description: 'A project',
        external_link: 'image 2',
        github_link: 'Same Github',
        image_link: 'image 2',
        name: 'name 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new project with same external link', async () => {
    await createProjectUseCase.execute({
      description: 'A project',
      external_link: 'Same external',
      github_link: 'github 1',
      image_link: 'image 1',
      name: 'name 1',
    });

    await expect(
      createProjectUseCase.execute({
        description: 'A project',
        external_link: 'Same external',
        github_link: 'image 2',
        image_link: 'image 2',
        name: 'name 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
