import { Request, Response } from 'express';
import { Controller } from '../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../presentation/protocols/http';

export const adaptByExpressRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      params: request.params,
      query: request.query,
      body: request.body,
      path: request.path,
      method: request.method?.toLowerCase(),
      user: request?.user,
      headers: request.headers,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    response.status(httpResponse.statusCode);
    response.send(httpResponse.body);
  };
};
