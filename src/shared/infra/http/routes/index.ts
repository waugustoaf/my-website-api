import { Router } from 'express';
import { technologyRoutes } from './technologies.routes';

export const routes = Router();

routes.use('/technologies', technologyRoutes);
