import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.entity';

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

  @Field(() => Int)
  categoryId: number;

  @Field(() => Category)
  category: Category;
}
