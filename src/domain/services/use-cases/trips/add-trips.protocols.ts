import { AddTripModel, TripModel } from '@/domain/models/trips';

export interface AddTripUseCaseProtocols {
  add: (trip: AddTripModel) => Promise<TripModel>;
}
