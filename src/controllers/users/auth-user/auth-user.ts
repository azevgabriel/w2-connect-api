import { AuthUserUseCaseProtocols } from '@/domain/services/use-cases/users/auth-user.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { ok } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { authUserBodySchema } from './body-schema';

export class AuthUserController implements Controller {
  constructor(private readonly authUserUseCase: AuthUserUseCaseProtocols) {}

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

      const safeBody = authUserBodySchema.safeParse(body);

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

      const { email, password } = safeBody.data;

      logger.trace(`User email to authenticate: ${email}`);
      const auth = await this.authUserUseCase.auth(email, password);

      logger.trace(`Token has been generated: ${!!auth.token}`);
      return ok(auth);
    } catch (error: any) {
      logger.error({ error }, 'Error while trying to authenticate user');
      return handlerException(error);
    }
  }
}
