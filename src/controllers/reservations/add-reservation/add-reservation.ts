import { AMQPHelperProtocols } from '@/domain/services/helpers/amqp.protocols';
import { AddReservationUseCaseProtocols } from '@/domain/services/use-cases/reservations/add-reservation.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { created } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addReservationBodySchema } from './body-schema';

export class AddReservationController implements Controller {
  constructor(
    private readonly addReservationUseCase: AddReservationUseCaseProtocols,
    private readonly amqpHelperProtocols: AMQPHelperProtocols
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const logger = httpRequest?.log;

    try {
      const body = httpRequest.body;

      if (!body) {
        logger.warn('Body is required');
        throw new ValidationError({
          action: 'Body is required',
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

      const reservation = await this.addReservationUseCase.add({
        ...safeBody.data,
        status: 'pending',
      });

      logger.trace(`Reservation ID created: ${reservation.id}`);

      logger.trace('Connecting to RabbitMQ server');
      await this.amqpHelperProtocols.connect();
      logger.trace('Connected to RabbitMQ server');
      logger.trace('Sending message to RabbitMQ queue');
      await this.amqpHelperProtocols.sendToQueue('reservation', reservation.id);
      logger.trace('Message sent to RabbitMQ queue');
      await this.amqpHelperProtocols.close();
      logger.trace('Connection to RabbitMQ server closed');

      return created(reservation);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to create a new reservation');
      return handlerException(error);
    }
  }
}
