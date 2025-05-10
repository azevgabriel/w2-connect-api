import { Router } from 'express';
import { adaptByExpressRoute } from '../adapters/express-router-adapter';
import { makeAddReservation } from '../factories/reservations/add-reservation';
import { makeDisableReservationById } from '../factories/reservations/disable-reservation-by-id';
import { makeUpdateReservationById } from '../factories/reservations/update-reservation-by-id';
import { ensureAuthenticateCustomer } from '../middlewares/ensureAuthenticateUser';

const reservationsRouter = Router();

reservationsRouter.post(
  '/',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeAddReservation())
);
reservationsRouter.patch(
  '/:id/cancel',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeDisableReservationById())
);
reservationsRouter.put(
  '/:id',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeUpdateReservationById())
);

export { reservationsRouter };
