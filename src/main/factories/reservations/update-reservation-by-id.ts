import { UpdateReservationByIdController } from '@/controllers/reservations/update-reservation-by-id/update-reservation-by-id';
import { ReservationsPrismaRepository } from '@/infra/prisma/reservations/reservations-prisma-repository';
import { UpdateReservationByIdUseCase } from '@/services/use-cases/reservations/update-reservation-by-id';

export const makeUpdateReservationById =
  (): UpdateReservationByIdController => {
    return new UpdateReservationByIdController(
      new UpdateReservationByIdUseCase(new ReservationsPrismaRepository())
    );
  };
