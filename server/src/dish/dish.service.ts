import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { CreateDishInput } from './dto/create-dish.input';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Category } from './entities/category.entity';

@Injectable()
export class DishService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private readonly MENU_KEY = 'GROUPED_MENU';

  async getAll() {
    return this.prisma.dish.findMany();
  }

  async getMenu() {
    const cached = await this.cacheManager.get<Category[]>(this.MENU_KEY);

    if (cached) return cached;

    const menu = await this.prisma.category.findMany({
      include: {
        dishes: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    await this.cacheManager.set(this.MENU_KEY, menu, 86400 * 1000);

    return menu;
  }

  async createCategory(data: CreateCategoryInput) {
    const { dishes, ...categoryData } = data;
    return this.prisma.category.create({
      data: {
        ...categoryData,
        dishes: dishes ? { create: dishes } : undefined,
      },
    });
    await this.cacheManager.del(this.MENU_KEY);
  }

  async createDish(categoryId: number, data: CreateDishInput) {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: {
        dishes: {
          create: data,
        },
      },
    });
    await this.cacheManager.del(this.MENU_KEY);
  }

  async changeDishAvailability(dishId: number, available: boolean) {
    return this.prisma.dish.update({
      where: { id: dishId },
      data: { available },
    });
    await this.cacheManager.del(this.MENU_KEY);
  }
}
