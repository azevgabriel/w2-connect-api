import { BaseErrorModel } from '@/domain/errors';
import { HttpResponse } from '../protocols/http';
import { PaginationResponse } from '../protocols/pagination';

export const badRequest = (error: BaseErrorModel): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: BaseErrorModel): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: null,
});

export const unauthorized = (error?: BaseErrorModel): HttpResponse => ({
  statusCode: 401,
  body: error || {},
});

export const serverError = (error: BaseErrorModel): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const paginate = (
  response: PaginationResponse<any, any>
): HttpResponse => ({
  statusCode: 200,
  body: {
    data: response.data,
    page: response.page,
    limit: response.limit,
    count: response.count,
  },
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
