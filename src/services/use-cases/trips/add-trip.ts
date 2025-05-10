import { AddTripModel, TripModel } from '@/domain/models/trips';
import { TripsRepository } from '@/domain/repositories/trips-repository';
import { AddTripUseCaseProtocols } from '@/domain/services/use-cases/trips/add-trips.protocols';

export class AddTripUseCase implements AddTripUseCaseProtocols {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async add(trip: AddTripModel): Promise<TripModel> {
    return await this.tripsRepository.add(trip);
  }
}
