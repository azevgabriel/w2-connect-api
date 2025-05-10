import {
  PaginationRequest,
  PaginationResponse,
} from '@/main/presentation/protocols/pagination';
import {
  AddTripModel,
  TripModel,
  TripModelWithReservations,
  TripsFilters,
} from '../models/trips';

export interface TripsRepository {
  add: (trip: AddTripModel) => Promise<TripModel>;
  loadById: (id: string) => Promise<TripModelWithReservations | null>;
  load: (
    data: PaginationRequest<TripsFilters>
  ) => Promise<PaginationResponse<TripModel>>;
  updateById: (
    id: string,
    trip: Partial<AddTripModel>
  ) => Promise<TripModel | null>;
}
