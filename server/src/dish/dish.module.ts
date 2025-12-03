import { Module } from '@nestjs/common';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DishResolver, DishService],
  exports: [DishService],
})
export class DishModule {}
