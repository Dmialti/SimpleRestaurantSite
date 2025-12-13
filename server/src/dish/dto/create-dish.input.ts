import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDishInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  imageSrc: string;

  @Field()
  available?: boolean;

  @Field(() => Int)
  categoryId: number;
}
