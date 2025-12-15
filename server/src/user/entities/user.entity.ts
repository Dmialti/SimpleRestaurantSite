import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Role } from '../../../prisma/generated/prisma/enums';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
