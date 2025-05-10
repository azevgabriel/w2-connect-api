import { ReservationModel } from '@/domain/models/reservations';
import { ReservationsRepository } from '@/domain/repositories/reservations-repository';
import { DisableReservationByIdUseCaseProtocols } from '@/domain/services/use-cases/reservations/disable-reservation-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';

export class DisabledReservationByIdUseCase
  implements DisableReservationByIdUseCaseProtocols
{
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) {}

  async disableById(id: string): Promise<ReservationModel> {
    const reservation = await this.reservationsRepository.disableById(id);

    if (!reservation)
      throw new ValidationError({
        action: 'Reservation not found.',
      });

    return reservation;
  }
}
