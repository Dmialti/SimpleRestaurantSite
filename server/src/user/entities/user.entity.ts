import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../../prisma/generated/prisma/enums';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  password: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
