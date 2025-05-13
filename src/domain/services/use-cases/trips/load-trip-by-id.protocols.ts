import { TripModelWithReservations } from '@/domain/models/trips';

export interface LoadTripByIdUseCaseProtocols {
  loadById: (id: string) => Promise<TripModelWithReservations>;
}
