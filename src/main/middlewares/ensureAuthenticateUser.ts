import { TokenHelper } from '@/services/helpers/token';
import { ForbiddenError } from '../presentation/errors';
import { handlerException } from '../presentation/helpers/http-handler-exceptions';

import { RequestHandler } from 'express';

export const ensureAuthenticateCustomer: RequestHandler = (req, res, next) => {
  const tokenHelper = new TokenHelper();

  try {
    if (!req.headers.authorization)
      throw new ForbiddenError({
        message: 'Missing authorization header',
        name: 'AuthorizationError',
      });

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer' || !token)
      throw new ForbiddenError({
        message: 'Invalid authorization header',
        name: 'AuthorizationError',
      });

    const user = tokenHelper.verifyToken(token);

    req.user = user;
    next();
  } catch (error: any) {
    const { statusCode, body } = handlerException(error);
    res.status(statusCode).send(body);
  }
};
