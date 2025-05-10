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
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        throw new ValidationError({
          action: 'Invalid parameter',
        });
      }

      const tripCreated = await this.loadTripByIdUseCase.loadById(id);

      return ok(tripCreated);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
