import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReservationStatus } from 'prisma/generated/prisma/client';

@ObjectType()
export class Reservation {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  dateAndTime: Date;

  @Field(() => ReservationStatus)
  status: ReservationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
