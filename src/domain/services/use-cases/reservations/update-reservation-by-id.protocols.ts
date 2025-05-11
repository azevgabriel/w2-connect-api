import {
  AddReservationModel,
  ReservationModel,
} from '@/domain/models/reservations';

export interface UpdateReservationByIdUseCaseProtocols {
  updateById: (
    id: string,
    reservation: Partial<AddReservationModel>
  ) => Promise<ReservationModel | null>;
}
