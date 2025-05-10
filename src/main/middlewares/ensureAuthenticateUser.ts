import { TokenHelper } from '@/services/helpers/token';
import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../presentation/errors';
import { handlerException } from '../presentation/helpers/http-handler-exceptions';

const tokenHelper = new TokenHelper();

export async function ensureAuthenticateCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

    const user = await tokenHelper.verifyToken(token);

    req.user = user;
    return next();
  } catch (error: any) {
    const { statusCode, body } = handlerException(error);
    return res.status(statusCode).json(body);
  }
}
