import { AddReservationModel, ReservationModel } from '../models/reservations';

export interface ReservationsRepository {
  add(reservation: AddReservationModel): Promise<ReservationModel>;
  updateById(
    id: string,
    reservation: Partial<AddReservationModel>
  ): Promise<ReservationModel | null>;
  disableById(id: string): Promise<ReservationModel | null>;
}
