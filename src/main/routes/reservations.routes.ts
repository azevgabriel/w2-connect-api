import { Router } from 'express';
import { ensureAuthenticateCustomer } from '../middlewares/ensureAuthenticateUser';

const reservationsRouter = Router();

reservationsRouter.post('/', ensureAuthenticateCustomer, () => {});
reservationsRouter.patch('/:id', ensureAuthenticateCustomer, () => {});
reservationsRouter.put('/:id', ensureAuthenticateCustomer, () => {});

export { reservationsRouter };
