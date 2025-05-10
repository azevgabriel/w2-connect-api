import { AddTripController } from '@/controllers/trails/add-trip/add-trip';
import { TripsPrismaRepository } from '@/infra/prisma/trips/trips-prisma-repository';
import { AddTripUseCase } from '@/services/use-cases/trips/add-trip';

export const makeAddTrip = (): AddTripController => {
  return new AddTripController(new AddTripUseCase(new TripsPrismaRepository()));
};
