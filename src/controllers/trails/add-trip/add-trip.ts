import { AddTripUseCaseProtocols } from '@/domain/services/use-cases/trips/add-trips.protocols';
import { ForbiddenError, ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { created } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addTripBodySchema } from './body-schema';

export class AddTripController implements Controller {
  constructor(private readonly addTripUseCase: AddTripUseCaseProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest?.body;
      const user = httpRequest?.user;

      if (!user) {
        throw new ForbiddenError({
          action: 'User not found',
        });
      }

      if (!body) {
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      const safeBody = addTripBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeBody.error.issues,
        });

      const tripCreated = await this.addTripUseCase.add({
        ...safeBody.data,
        userId: user.id,
      });

      return created(tripCreated);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
