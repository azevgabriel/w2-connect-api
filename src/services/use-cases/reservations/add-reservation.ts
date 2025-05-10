import {
  AddReservationModel,
  ReservationModel,
} from '@/domain/models/reservations';
import { ReservationsRepository } from '@/domain/repositories/reservations-repository';
import { AddReservationUseCaseProtocols } from '@/domain/services/use-cases/reservations/add-reservation.protocols';

export class AddReservationUseCase implements AddReservationUseCaseProtocols {
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) {}

  async add(reservation: AddReservationModel): Promise<ReservationModel> {
    return await this.reservationsRepository.add(reservation);
  }
}
