import { Router } from 'express';
import { reservationsRouter } from './reservations.routes';
import { tripsRouter } from './trips.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/trips', tripsRouter);
routes.use('/reservations', reservationsRouter);

export { routes };
