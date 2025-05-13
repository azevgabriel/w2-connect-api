import { LoadTripByIdUseCaseProtocols } from '@/domain/services/use-cases/trips/load-trip-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { ok } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';

export class LoadTripByIdController implements Controller {
  constructor(
    private readonly loadTripByIdUseCase: LoadTripByIdUseCaseProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const logger = httpRequest?.log;

    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        logger.warn('ID is required');
        throw new ValidationError({
          action: 'Invalid parameter',
        });
      }

      const tripCreated = await this.loadTripByIdUseCase.loadById(id);

      logger.trace(`Trip ID loaded: ${tripCreated.id}`);
      logger.trace(`Qtnd of reservations: ${tripCreated.reservations.length}`);

      return ok(tripCreated);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to load a trip by ID');
      return handlerException(error);
    }
  }
}
