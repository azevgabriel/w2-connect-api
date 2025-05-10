import { AddReservationController } from '@/controllers/reservations/add-reservation/add-reservation';
import { ReservationsPrismaRepository } from '@/infra/prisma/reservations/reservations-prisma-repository';
import { AddReservationUseCase } from '@/services/use-cases/reservations/add-reservation';

export const makeAddReservation = (): AddReservationController => {
  return new AddReservationController(
    new AddReservationUseCase(new ReservationsPrismaRepository())
  );
};
