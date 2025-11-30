import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { CreateDishInput } from './dto/create-dish.input';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.dish.findMany();
  }

  async getByCategory(categoryId: number) {
    return this.prisma.dish.findMany({ where: { categoryId } });
  }

  async createCategory(data: CreateCategoryInput) {
    const { dishes, ...categoryData } = data;
    return this.prisma.category.create({
      data: {
        ...categoryData,
        dishes: dishes ? { create: dishes } : undefined,
      },
    });
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
  }
}
