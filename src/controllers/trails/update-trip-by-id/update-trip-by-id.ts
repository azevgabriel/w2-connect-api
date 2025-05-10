import { UpdateTripByIdUseCaseProtocols } from '@/domain/services/use-cases/trips/update-trip-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { ok } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { updateTripBodySchema } from './body-schema';

export class UpdateTripByIdController implements Controller {
  constructor(
    private readonly updateTripByIdUseCase: UpdateTripByIdUseCaseProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest?.body;
      const id = httpRequest?.params?.id;

      if (!body) {
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      if (!id) {
        throw new ValidationError({
          action: 'Invalid parameter',
        });
      }

      const safeBody = updateTripBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeBody.error.issues,
        });

      const updatedTrip = await this.updateTripByIdUseCase.updateById(
        id,
        safeBody.data
      );

      return ok(updatedTrip);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
