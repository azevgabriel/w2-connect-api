export interface ReservationModel {
  id: string;
  startDate: Date;
  endDate: Date;
  type: 'flight' | 'hotel' | 'car' | 'activity';
  value: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  tripId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddReservationModel = Omit<
  ReservationModel,
  'id' | 'createdAt' | 'updatedAt'
>;
