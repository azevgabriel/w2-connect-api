import { ReservationsModel } from './reservations';

export interface TripModel {
  id: string;
  startDate: Date;
  name: string;
  status: 'planned' | 'in_progress' | 'completed' | 'canceled';
  reservations: ReservationsModel[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddTripModel = Omit<TripModel, 'id' | 'createdAt' | 'updatedAt'>;
