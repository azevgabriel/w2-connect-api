import { ReservationModel } from '@/domain/models/reservations';

export interface DisableReservationByIdUseCaseProtocols {
  disableById: (id: string) => Promise<ReservationModel>;
}
