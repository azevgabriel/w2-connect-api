import { AddReservationUseCaseProtocols } from '@/domain/services/use-cases/reservations/add-reservation.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { created } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addReservationBodySchema } from './body-schema';

export class AddReservationController implements Controller {
  constructor(
    private readonly addReservationUseCase: AddReservationUseCaseProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body;

      if (!body) {
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      const safeBody = addReservationBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeBody.error.issues,
        });

      const reservation = await this.addReservationUseCase.add(safeBody.data);

      return created(reservation);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
