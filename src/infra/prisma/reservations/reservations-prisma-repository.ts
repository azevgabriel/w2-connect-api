import {
  AddReservationsModel,
  ReservationsModel,
} from '@/domain/models/reservations';
import { ReservationsRepository } from '@/domain/repositories/reservations-repository';
import { prismaHelper } from '..';

export class ReservationsPrismaRepository implements ReservationsRepository {
  #reservationRepository = prismaHelper.reservations;

  async add(reservation: AddReservationsModel): Promise<ReservationsModel> {
    return await this.#reservationRepository.create({
      data: reservation,
    });
  }

  async updateById(
    id: string,
    reservation: Partial<AddReservationsModel>
  ): Promise<ReservationsModel | null> {
    return await this.#reservationRepository.update({
      where: { id },
      data: reservation,
    });
  }

  async disableById(id: string): Promise<ReservationsModel | null> {
    return await this.#reservationRepository.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
}
