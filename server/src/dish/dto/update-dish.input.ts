import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDishInput {
  @Field(() => Int)
  id: number;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field(() => Float)
  price?: number;

  @Field()
  imageSrc?: string;

  @Field()
  available?: boolean;
}
