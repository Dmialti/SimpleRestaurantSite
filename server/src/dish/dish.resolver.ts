import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';
import { DishService } from './dish.service';
import { CreateDishInput } from './dto/create-dish.input';
import { CreateCategoryInput } from './dto/create-category.input';

@Resolver(() => Category)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Query(() => [Dish], { name: 'dishes' })
  getAll() {
    return this.dishService.getAll();
  }
  y;
  @Query(() => [Category], { name: 'getMenu' })
  getMenu() {
    return this.dishService.getMenu();
  }

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.dishService.createCategory(createCategoryInput);
  }

  @Mutation(() => Dish)
  createDish(
    @Args('categoryId') categoryId: number,
    @Args('createDishInput') createDishInput: CreateDishInput,
  ) {
    return this.dishService.createDish(categoryId, createDishInput);
  }

  @Mutation(() => Dish)
  updateDishAvailability(
    @Args('dishId') dishId: number,
    @Args('available') available: boolean,
  ) {
    return this.dishService.updateDishAvailability(dishId, available);
  }
}
