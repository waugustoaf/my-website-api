import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { projectRoutes } from './projects.routes';
import { technologyRoutes } from './technologies.routes';
import { userRoutes } from './users.routes';

export const routes = Router();

routes.use('/technologies', technologyRoutes);
routes.use('/users', userRoutes);
routes.use('/projects', projectRoutes);
routes.use(authenticateRoutes);
