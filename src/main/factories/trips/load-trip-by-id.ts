import { LoadTripByIdController } from '@/controllers/trails/load-trip-by-id/load-trip-by-id';
import { TripsPrismaRepository } from '@/infra/prisma/trips/trips-prisma-repository';
import { LoadTripByIdUseCase } from '@/services/use-cases/trips/load-trip-by-id';

export const makeLoadTripById = (): LoadTripByIdController => {
  return new LoadTripByIdController(
    new LoadTripByIdUseCase(new TripsPrismaRepository())
  );
};
