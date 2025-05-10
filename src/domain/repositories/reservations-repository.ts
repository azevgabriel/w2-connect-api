import {
  AddReservationsModel,
  ReservationsModel,
} from '../models/reservations';

export interface ReservationsRepository {
  add(reservation: AddReservationsModel): Promise<ReservationsModel>;
  updateById(
    id: string,
    reservation: Partial<AddReservationsModel>
  ): Promise<ReservationsModel | null>;
  disableById(id: string): Promise<ReservationsModel | null>;
}
