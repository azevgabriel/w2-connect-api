import { ReservationsModel } from './reservations';

export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'canceled';

export interface TripModel {
  id: string;
  startDate: Date;
  name: string;
  status: TripStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripModelWithReservations extends TripModel {
  reservations: ReservationsModel[];
}

export type AddTripModel = Omit<TripModel, 'id' | 'createdAt' | 'updatedAt'>;

export interface TripsFilters {
  userId: string;
  status?: TripStatus;
}
