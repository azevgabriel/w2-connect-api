import { AddUserServiceProtocols } from '@/domain/services/use-cases/users/add-user.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { addUserBodySchema } from './body-schema';

export class AddUserController implements Controller {
  constructor(private readonly addUserService: AddUserServiceProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        throw new ValidationError({
          action: 'Adicione o corpo da requisição',
        });
      }

      const safeBody = addUserBodySchema.safeParse(body);

      if (!safeBody.success)
        throw new ValidationError({
          message: 'O corpo da requisição é inválido.',
          action: safeBody.error.issues,
        });

      const userCreated = await this.addUserService.add(safeBody.data);

      return {
        statusCode: 201,
        body: userCreated,
      };
    } catch (error: any) {
      console.error(error);
      return handlerException(error);
    }
  }
}
