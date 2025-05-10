import { Router } from 'express';
import { adaptByExpressRoute } from '../adapters/express-router-adapter';
import { makeAddTrip } from '../factories/trips/add-trip';
import { makeLoadTripById } from '../factories/trips/load-trip-by-id';
import { makeLoadTrips } from '../factories/trips/load-trips';
import { makeUpdateTripById } from '../factories/trips/update-trip-by-id';
import { ensureAuthenticateCustomer } from '../middlewares/ensureAuthenticateUser';

const tripsRouter = Router();

tripsRouter.post(
  '/',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeAddTrip())
);
tripsRouter.get(
  '/',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeLoadTrips())
);
tripsRouter.get(
  '/:id',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeLoadTripById())
);
tripsRouter.put(
  '/:id',
  ensureAuthenticateCustomer,
  adaptByExpressRoute(makeUpdateTripById())
);

export { tripsRouter };
