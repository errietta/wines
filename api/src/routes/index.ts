import { Router } from 'express';
import searchRoutes from './search';
import { RouteState } from '../types';

const router = Router();

const routes = (state: RouteState) => {
  router.use('/search', searchRoutes(state));

  return router;
};

export default routes;
