import { Router } from 'express';
import { adaptByExpressRoute } from '../adapters/express-router-adapter';
import { makeAddUser } from '../factories/users/add-user';
import { makeAuthUser } from '../factories/users/auth-user';

const usersRouter = Router();

usersRouter.post('/', adaptByExpressRoute(makeAddUser()));
usersRouter.post('/auth', adaptByExpressRoute(makeAuthUser()));

export { usersRouter };
