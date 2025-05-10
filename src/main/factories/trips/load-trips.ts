import { LoadTripsController } from '@/controllers/trails/load-trips/load-trips';
import { TripsPrismaRepository } from '@/infra/prisma/trips/trips-prisma-repository';
import { LoadTripsUseCase } from '@/services/use-cases/trips/load-trips';

export const makeLoadTrips = (): LoadTripsController => {
  return new LoadTripsController(
    new LoadTripsUseCase(new TripsPrismaRepository())
  );
};
