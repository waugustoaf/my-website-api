import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CreateTechnologyController } from '@modules/technologies/useCases/createTechnology/CreateTechnologyController';
import { ListTechnologiesController } from '@modules/technologies/useCases/listTechnologies/ListTechnologiesController';

export const technologyRoutes = Router();

const createTechnology = new CreateTechnologyController();
const listTechnologies = new ListTechnologiesController();

technologyRoutes.post(
  '/',
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
