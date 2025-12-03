import { registerEnumType } from '@nestjs/graphql';
import { ReservationStatus } from '../../../prisma/generated/prisma/enums';

export function registerReservationEnums() {
  registerEnumType(ReservationStatus, { name: 'ReservationStatus' });
}
