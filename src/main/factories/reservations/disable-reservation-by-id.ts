import { DisabledReservationByIdController } from '@/controllers/reservations/disable-reservation-by-id/disable-reservation-by-id';
import { ReservationsPrismaRepository } from '@/infra/prisma/reservations/reservations-prisma-repository';
import { DisabledReservationByIdUseCase } from '@/services/use-cases/reservations/disable-reservation-by-id';

export const makeDisableReservationById =
  (): DisabledReservationByIdController => {
    return new DisabledReservationByIdController(
      new DisabledReservationByIdUseCase(new ReservationsPrismaRepository())
    );
  };
