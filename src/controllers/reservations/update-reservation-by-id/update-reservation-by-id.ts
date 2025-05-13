import { UpdateReservationByIdUseCaseProtocols } from '@/domain/services/use-cases/reservations/update-reservation-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { ok } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addReservationBodySchema } from './body-schema';

export class UpdateReservationByIdController implements Controller {
  constructor(
    private readonly updateReservationByIdUseCase: UpdateReservationByIdUseCaseProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const logger = httpRequest?.log;

    try {
      const body = httpRequest.body;
      const id = httpRequest.params?.id;

      if (!body) {
        logger.warn('Body is required');
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      if (!id) {
        logger.warn('ID is required');
        throw new ValidationError({
          action: '(Params) ID is required',
        });
      }

      const safeBody = addReservationBodySchema.safeParse(body);

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

      const reservation = await this.updateReservationByIdUseCase.updateById(
        id,
        safeBody.data
      );

      logger.trace(`Reservation ID updated: ${reservation.id}`);
      return ok(reservation);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to update a reservation');
      return handlerException(error);
    }
  }
}
