import { Router } from 'express';
import { adaptByExpressRoute } from '../adapters/express-router-adapter';
import { makeAddUser } from '../factories/users/add-user';

const usersRouter = Router();

usersRouter.post('/', adaptByExpressRoute(makeAddUser()));

export { usersRouter };
