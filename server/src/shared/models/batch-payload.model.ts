import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BatchPayload {
  @Field(() => Int)
  count: number;
}
