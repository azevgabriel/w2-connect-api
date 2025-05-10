import { TripModel } from '@/domain/models/trips';

export interface LoadTripByIdUseCaseProtocols {
  loadById: (id: string) => Promise<TripModel>;
}
