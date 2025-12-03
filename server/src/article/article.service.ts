import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article.findMany();
  }

  async create(data: CreateArticleInput) {
    const { paragraphs, ...articleData } = data;

    return this.prisma.article.create({
      data: {
        ...articleData,
        paragraphs: paragraphs ? { create: paragraphs } : undefined,
      },
    });
  }

  async getParagraphsByArticleId(articleId: number) {
    return this.prisma.paragraph.findMany({
      where: { articleId },
      orderBy: { position: 'asc' },
    });
  }
}
