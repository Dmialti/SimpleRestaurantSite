import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ArticlePayload {
  @Field(() => Int)
  count: number;
}
