import { AddUserUseCaseProtocols } from '@/domain/services/use-cases/users/add-user.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { created } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addUserBodySchema } from './body-schema';

export class AddUserController implements Controller {
  constructor(private readonly addUserService: AddUserUseCaseProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const logger = httpRequest?.log;

    try {
      const body = httpRequest?.body;

      if (!body) {
        logger.warn('Body is required');
        throw new ValidationError({
          action: 'Body is required',
        });
      }

      const safeBody = addUserBodySchema.safeParse(body);

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

      const userCreated = await this.addUserService.add(safeBody.data);

      logger.trace(`User ID created: ${userCreated.id}`);

      return created(userCreated);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to create a new user');
      return handlerException(error);
    }
  }
}
