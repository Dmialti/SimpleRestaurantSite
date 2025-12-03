import { Field, InputType, Int } from '@nestjs/graphql';
import { ReservationStatus } from '../../../prisma/generated/prisma/enums';

@InputType()
export class CreateReservationInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  dateTime: Date;

  @Field(() => Int)
  guests: number;

  @Field(() => ReservationStatus)
  status: ReservationStatus;
}
