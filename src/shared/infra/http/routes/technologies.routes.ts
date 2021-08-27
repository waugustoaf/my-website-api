import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CreateTechnologyController } from '@modules/technologies/useCases/createTechnology/CreateTechnologyController';
import { ListTechnologiesController } from '@modules/technologies/useCases/listTechnologies/ListTechnologiesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';

export const technologyRoutes = Router();

const createTechnology = new CreateTechnologyController();
const listTechnologies = new ListTechnologiesController();

technologyRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      time_in_months: Joi.number().required(),
      time_in_years: Joi.number().required(),
    },
  }),
  createTechnology.handle,
);

technologyRoutes.get('/', listTechnologies.handle);
