import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateDishInput } from './create-dish.input';

@InputType()
export class UpdateDishInput extends PartialType(CreateDishInput) {
  @Field(() => Int)
  id: number;
}
