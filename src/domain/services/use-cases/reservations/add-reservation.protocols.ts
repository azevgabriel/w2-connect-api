import {
  AddReservationModel,
  ReservationModel,
} from '@/domain/models/reservations';

export interface AddReservationUseCaseProtocols {
  add: (reservation: AddReservationModel) => Promise<ReservationModel>;
}
