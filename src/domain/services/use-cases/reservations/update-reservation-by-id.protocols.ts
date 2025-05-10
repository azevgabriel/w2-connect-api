import { AddReservationModel } from '@/domain/models/reservations';
import { ReservationModel } from '@prisma/client';

export interface UpdateReservationByIdUseCaseProtocols {
  updateById: (
    id: string,
    reservation: Partial<AddReservationModel>
  ) => Promise<ReservationModel | null>;
}
