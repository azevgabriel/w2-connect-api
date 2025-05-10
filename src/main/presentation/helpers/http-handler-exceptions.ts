import {
  BaseError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ServiceError,
  UnauthorizedError,
  ValidationError,
} from '../errors';
import { HttpResponse } from '../protocols/http';
import {
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
} from './http-response';

export const handlerException = (error: BaseError): HttpResponse => {
  if (error instanceof ForbiddenError) return forbidden(error);
  if (error instanceof NotFoundError) return notFound();
  if (error instanceof ValidationError) return badRequest(error);
  if (error instanceof UnauthorizedError) return unauthorized(error);
  if (error instanceof MethodNotAllowedError) return notFound();
  if (error instanceof ServiceError) return serverError(error);
  if (error instanceof InternalServerError) return serverError(error);

  return serverError(error);
};
