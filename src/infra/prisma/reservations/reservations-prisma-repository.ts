import {
  AddReservationModel,
  ReservationModel,
} from '@/domain/models/reservations';
import { ReservationsRepository } from '@/domain/repositories/reservations-repository';
import { prismaHelper } from '..';

export class ReservationsPrismaRepository implements ReservationsRepository {
  #reservationRepository = prismaHelper.reservations;

  async add(reservation: AddReservationModel): Promise<ReservationModel> {
    return await this.#reservationRepository.create({
      data: reservation,
    });
  }

  async updateById(
    id: string,
    reservation: Partial<AddReservationModel>
  ): Promise<ReservationModel | null> {
    return await this.#reservationRepository.update({
      where: { id },
      data: reservation,
    });
  }

  async disableById(id: string): Promise<ReservationModel | null> {
    return await this.#reservationRepository.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
}
