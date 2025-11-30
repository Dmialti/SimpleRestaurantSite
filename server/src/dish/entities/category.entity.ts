import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Dish } from './dish.entity';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => [Dish])
  dishes?: Dish[];
}
