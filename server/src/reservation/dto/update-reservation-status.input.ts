import { Field, InputType, Int } from '@nestjs/graphql';
import { ReservationStatus } from 'prisma/generated/prisma/enums';

@InputType()
export class UpdateReservationStatusInput {
  @Field(() => Int)
  id: number;

  @Field(() => ReservationStatus)
  status: ReservationStatus;
}
