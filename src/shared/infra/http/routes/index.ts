import { Router } from 'express';
import { technologyRoutes } from './technologies.routes';
import { userRoutes } from './users.routes';

export const routes = Router();

routes.use('/technologies', technologyRoutes);
routes.use('/users', userRoutes);
