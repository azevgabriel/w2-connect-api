import { LoadTripsUseCaseProtocols } from '@/domain/services/use-cases/trips/load-trips.protocols';
import { ForbiddenError, ValidationError } from '@/main/presentation/errors';
import { handlerException } from '@/main/presentation/helpers/http-handler-exceptions';
import { paginate } from '@/main/presentation/helpers/http-response';
import { Controller } from '@/main/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/main/presentation/protocols/http';
import { parsedQuery } from '@/utils/query';
import { loadTripsQuerySchema } from './query-schema';

export class LoadTripsController implements Controller {
  constructor(private readonly loadTripsUseCase: LoadTripsUseCaseProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = httpRequest?.user;
      const query = parsedQuery(httpRequest?.query);

      if (!user) {
        throw new ForbiddenError({});
      }

      const safeQuery = query ? loadTripsQuerySchema.safeParse(query) : null;

      if (safeQuery && !safeQuery.success)
        throw new ValidationError({
          message: 'The request body is invalid.',
          action: safeQuery.error.issues,
        });

      const tripsPagination = await this.loadTripsUseCase.load({
        limit: safeQuery?.data.limit || 10,
        page: safeQuery?.data.page || 1,
        filters: {
          ...safeQuery?.data.filters,
          userId: user.id,
        },
      });

      return paginate(tripsPagination);
    } catch (error: any) {
      return handlerException(error);
    }
  }
}
