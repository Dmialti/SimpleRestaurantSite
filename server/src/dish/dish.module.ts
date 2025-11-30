import { Module } from '@nestjs/common';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';

@Module({
  providers: [DishResolver, DishService],
  exports: [DishService],
})
export class DishModule {}
