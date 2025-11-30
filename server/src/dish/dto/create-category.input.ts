import { Field, InputType } from '@nestjs/graphql';
import { Dish } from '../entities/dish.entity';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => [Dish])
  dishes: Dish[];
}
