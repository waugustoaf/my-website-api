import { CreateProjectController } from '@modules/projects/useCases/createProject/CreateProjectController';
import { ListProjectsController } from '@modules/projects/useCases/listProjects/ListProjectsController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const projectRoutes = Router();

const createProject = new CreateProjectController();
const listProjects = new ListProjectsController();

projectRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      external_link: Joi.string().uri().required(),
      github_link: Joi.string().uri().required(),
      image_link: Joi.string().uri().required(),
    },
  }),
  createProject.handle,
);

projectRoutes.get('/', listProjects.handle);
