import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';
import { DishService } from './dish.service';
import { CreateDishInput } from './dto/create-dish.input';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateDishInput } from './dto/update-dish.input';
import { DishPayload } from './entities/dish-payload.entity';

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

  @Query(() => Dish, { name: 'dish' })
  getDishById(@Args('id', { type: () => Int }) id: number) {
    return this.dishService.getDishById(id);
  }

  @Query(() => [Category], { name: 'categories' })
  getCategories() {
    return this.dishService.getCategories();
  }

  @Mutation(() => Category)
  @UseGuards(AuthGuard)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.dishService.createCategory(createCategoryInput);
  }

  @Mutation(() => Dish)
  @UseGuards(AuthGuard)
  createDish(@Args('createDishInput') createDishInput: CreateDishInput) {
    return this.dishService.createDish(createDishInput);
  }

  @Mutation(() => Dish)
  @UseGuards(AuthGuard)
  updateDish(@Args('updateDishInput') updateDishInput: UpdateDishInput) {
    return this.dishService.updateDish(updateDishInput);
  }

  @Mutation(() => Dish)
  @UseGuards(AuthGuard)
  updateDishAvailability(
    @Args('dishId') dishId: number,
    @Args('available') available: boolean,
  ) {
    return this.dishService.updateDishAvailability(dishId, available);
  }

  @Mutation(() => Dish)
  @UseGuards(AuthGuard)
  deleteDishById(@Args('id', { type: () => Int }) id: number) {
    return this.dishService.deleteDishById(id);
  }

  @Mutation(() => DishPayload)
  @UseGuards(AuthGuard)
  deleteDishes(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.dishService.deleteDishes(ids);
  }
}
