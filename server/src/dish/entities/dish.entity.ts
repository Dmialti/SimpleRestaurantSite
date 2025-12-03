import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dish {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  imageSrc: string;

  @Field()
  available: boolean;

  @Field()
  createdAt: Date;
}
