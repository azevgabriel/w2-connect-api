import { AddReservationModel } from '@/domain/models/reservations';
import { ReservationsRepository } from '@/domain/repositories/reservations-repository';
import { UpdateReservationByIdUseCaseProtocols } from '@/domain/services/use-cases/reservations/update-reservation-by-id.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { ReservationModel } from '@prisma/client';

export class UpdateReservationByIdUseCase
  implements UpdateReservationByIdUseCaseProtocols
{
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) {}

  async updateById(
    id: string,
    data: Partial<AddReservationModel>
  ): Promise<ReservationModel> {
    const updatedReservation = await this.reservationsRepository.updateById(
      id,
      data
    );

    if (!updatedReservation)
      throw new ValidationError({
        action: 'Reservation not found.',
      });

    return updatedReservation;
  }
}
