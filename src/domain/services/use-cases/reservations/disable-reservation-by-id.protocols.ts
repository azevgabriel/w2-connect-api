import { ReservationModel } from '@prisma/client';

export interface DisableReservationByIdUseCaseProtocols {
  disableById: (id: string) => Promise<ReservationModel>;
}
