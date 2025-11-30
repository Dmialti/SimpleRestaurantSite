import { Field, InputType } from '@nestjs/graphql';
import { CreateDishInput } from './create-dish.input';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => [CreateDishInput])
  dishes: CreateDishInput[];
}
