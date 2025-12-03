import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { UpdateReservationStatusInput } from './dto/update-reservation-status.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => [Reservation], { name: 'reservations' })
  getAll() {
    return this.reservationService.getAll();
  }

  @Mutation(() => Reservation)
  @UseGuards(AuthGuard)
  updateReservationStatus(data: UpdateReservationStatusInput) {
    return this.reservationService.updateReservationStatus(data);
  }
}
