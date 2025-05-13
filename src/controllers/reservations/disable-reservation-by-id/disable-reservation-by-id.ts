import { DisableReservationByIdUseCaseProtocols } from '@/domain/services/use-cases/reservations/disable-reservation-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { ok } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';

export class DisabledReservationByIdController implements Controller {
  constructor(
    private readonly disableReservationByIdUseCase: DisableReservationByIdUseCaseProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const logger = httpRequest?.log;

    try {
      const id = httpRequest.params?.id;

      if (!id) {
        logger.warn('ID is required');
        throw new ValidationError({
          action: '(Params) ID is required',
        });
      }

      const reservation = await this.disableReservationByIdUseCase.disableById(
        id
      );

      logger.trace(`Reservation ID disabled: ${reservation.id}`);
      return ok(reservation);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to disable a reservation');
      return handlerException(error);
    }
  }
}
