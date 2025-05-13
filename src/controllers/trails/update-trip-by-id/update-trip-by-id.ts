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
    const logger = httpRequest?.log;

    try {
      const body = httpRequest?.body;
      const id = httpRequest?.params?.id;

      if (!body) {
        logger.warn('Body is required');
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      if (!id) {
        logger.warn('ID is required');
        throw new ValidationError({
          action: 'Invalid parameter',
        });
      }

      const safeBody = updateTripBodySchema.safeParse(body);

      if (!safeBody.success) {
        logger.warn(
          { bodyIssues: safeBody.error.issues },
          'The request body is invalid'
        );
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeBody.error.issues,
        });
      }

      const updatedTrip = await this.updateTripByIdUseCase.updateById(
        id,
        safeBody.data
      );

      logger.trace(`Trip ID updated: ${updatedTrip.id}`);

      return ok(updatedTrip);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to update a trip');
      return handlerException(error);
    }
  }
}
