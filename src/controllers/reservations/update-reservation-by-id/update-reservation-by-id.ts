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
    try {
      const body = httpRequest.body;
      const id = httpRequest.params?.id;

      if (!body) {
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      if (!id) {
        throw new ValidationError({
          action: '(Params) ID is required',
        });
      }

      const safeBody = addReservationBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeBody.error.issues,
        });

      const reservation = await this.updateReservationByIdUseCase.updateById(
        id,
        safeBody.data
      );

      return ok(reservation);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
