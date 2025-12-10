import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DishPayload {
  @Field(() => Int)
  count: number;
}
