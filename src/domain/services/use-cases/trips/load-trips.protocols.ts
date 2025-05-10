import { TripModel, TripsFilters } from '@/domain/models/trips';
import {
  PaginationRequest,
  PaginationResponse,
} from '@/main/presentation/protocols/pagination';

export interface LoadTripsUseCaseProtocols {
  load(
    data: PaginationRequest<TripsFilters>
  ): Promise<PaginationResponse<TripModel>>;
}
