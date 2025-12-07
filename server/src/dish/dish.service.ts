import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { CreateDishInput } from './dto/create-dish.input';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Category } from './entities/category.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDishInput } from './dto/update-dish.input';

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

    const res = await this.prisma.category.create({
      data: {
        ...categoryData,
        dishes: dishes ? { create: dishes } : undefined,
      },
    });

    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }

  async createDish(categoryId: number, data: CreateDishInput) {
    const res = await this.prisma.dish.create({
      data: {
        ...data,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }

  async updateDish(data: UpdateDishInput) {
    const res = await this.prisma.dish.update({
      where: { id: data.id },
      data: data,
    });
    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }

  async updateDishAvailability(dishId: number, available: boolean) {
    const res = await this.prisma.dish.update({
      where: { id: dishId },
      data: { available },
    });

    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }

  async deleteDishById(id: number) {
    const res = await this.prisma.dish.deleteMany({ where: { id } });
    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }

  async deleteDishes(ids: number[]) {
    const res = await this.prisma.dish.deleteMany({
      where: { id: { in: ids } },
    });
    await this.cacheManager.del(this.MENU_KEY);
    return res;
  }
}
