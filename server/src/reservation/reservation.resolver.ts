import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { UpdateReservationStatusInput } from './dto/update-reservation-status.input';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => [Reservation], { name: 'reservations' })
  getAll() {
    return this.reservationService.getAll();
  }

  @Mutation(() => Reservation)
  updateReservationStatus(data: UpdateReservationStatusInput) {
    return this.reservationService.updateReservationStatus(data);
  }
}
