import {
  AddTripModel,
  TripModel,
  TripModelWithReservations,
  TripsFilters,
} from '@/domain/models/trips';
import { TripsRepository } from '@/domain/repositories/trips-repository';
import {
  PaginationRequest,
  PaginationResponse,
} from '@/main/presentation/protocols/pagination';
import { prismaHelper } from '..';

export class TripsPrismaRepository implements TripsRepository {
  #tripsRepository = prismaHelper.trips;

  async load(
    data: PaginationRequest<TripsFilters>
  ): Promise<PaginationResponse<TripModel>> {
    const { page = 1, limit = 10, filters } = data;
    const where = {
      userId: filters?.userId,
      status: filters?.status,
    };

    const [trips, count] = await this.#tripsRepository.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: trips,
      page,
      limit,
      count: { total: count },
    };
  }

  async add(trip: AddTripModel): Promise<TripModel> {
    return await this.#tripsRepository.create({
      data: trip,
    });
  }

  async updateById(
    id: string,
    trip: Partial<AddTripModel>
  ): Promise<TripModel | null> {
    return await this.#tripsRepository.update({
      where: { id },
      data: trip,
    });
  }

  async loadById(id: string): Promise<TripModelWithReservations | null> {
    return await this.#tripsRepository.findUnique({
      where: { id },
      include: {
        reservations: true,
      },
    });
  }
}
