import { TripModel, TripsFilters } from '@/domain/models/trips';
import { TripsRepository } from '@/domain/repositories/trips-repository';
import { LoadTripsUseCaseProtocols } from '@/domain/services/use-cases/trips/load-trips.protocols';
import {
  PaginationRequest,
  PaginationResponse,
} from '@/main/presentation/protocols/pagination';

export class LoadTripsUseCase implements LoadTripsUseCaseProtocols {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async load(
    data: PaginationRequest<TripsFilters>
  ): Promise<PaginationResponse<TripModel>> {
    return await this.tripsRepository.load(data);
  }
}
