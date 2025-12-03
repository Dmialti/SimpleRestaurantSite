import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { registerReservationEnums } from './utils/reservation-enum.register';
import { AuthModule } from '../auth/auth.module';

registerReservationEnums();

@Module({
  imports: [AuthModule],
  providers: [ReservationResolver, ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
