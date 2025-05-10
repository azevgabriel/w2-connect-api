import { AddTripModel, TripModel } from '@/domain/models/trips';
import { TripsRepository } from '@/domain/repositories/trips-repository';
import { UpdateTripByIdUseCaseProtocols } from '@/domain/services/use-cases/trips/update-trip-by-id.protocols';
import { NotFoundError } from '@/main/presentation/errors';

export class UpdateTripByIdUseCase implements UpdateTripByIdUseCaseProtocols {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async updateById(
    id: string,
    data: Partial<AddTripModel>
  ): Promise<TripModel> {
    const trip = await this.tripsRepository.loadById(id);

    if (!trip)
      throw new NotFoundError({
        action: 'Trip not found.',
      });

    const updatedTrip = await this.tripsRepository.updateById(id, data);

    if (!updatedTrip)
      throw new NotFoundError({
        action: 'Trip not found.',
      });

    return updatedTrip;
  }
}
