import { AddUserServiceProtocols } from '@/domain/services/internal/users/add-user.protocols';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';

export class AddUserController implements Controller {
  constructor(private readonly addUserService: AddUserServiceProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const userCreated = await this.addUserService.add(body);

      return {
        statusCode: 201,
        body: userCreated,
      };
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
