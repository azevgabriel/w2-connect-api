import { UpdateTripByIdController } from '@/controllers/trails/update-trip-by-id/update-trip-by-id';
import { TripsPrismaRepository } from '@/infra/prisma/trips/trips-prisma-repository';
import { UpdateTripByIdUseCase } from '@/services/use-cases/trips/update-trip-by-id';

export const makeUpdateTripById = (): UpdateTripByIdController => {
  return new UpdateTripByIdController(
    new UpdateTripByIdUseCase(new TripsPrismaRepository())
  );
};
