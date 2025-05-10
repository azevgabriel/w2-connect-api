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
    try {
      const body = httpRequest?.body;

      if (!body) {
        throw new ValidationError({
          action: 'Adicione o corpo da requisição',
        });
      }

      const safeBody = authUserBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'O corpo da requisição é inválido.',
          action: safeBody.error.issues,
        });

      const { email, password } = safeBody.data;

      const userCreated = await this.authUserUseCase.auth(email, password);

      return ok(userCreated);
    } catch (error: any) {
      console.error(error);
      return handlerException(error);
    }
  }
}
