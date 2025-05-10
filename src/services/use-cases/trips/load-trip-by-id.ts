import { TripModel } from '@/domain/models/trips';
import { TripsRepository } from '@/domain/repositories/trips-repository';
import { LoadTripByIdUseCaseProtocols } from '@/domain/services/use-cases/trips/load-trip-by-id.protocols';
import { NotFoundError } from '@/main/presentation/errors';

export class LoadTripByIdUseCase implements LoadTripByIdUseCaseProtocols {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async loadById(id: string): Promise<TripModel> {
    const trip = await this.tripsRepository.loadById(id);

    if (!trip)
      throw new NotFoundError({
        action: 'Trip not found.',
      });

    return trip;
  }
}
