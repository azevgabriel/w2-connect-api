import { AddTripModel, TripModel } from '@/domain/models/trips';

export interface UpdateTripByIdUseCaseProtocols {
  updateById: (id: string, trip: Partial<AddTripModel>) => Promise<TripModel>;
}
