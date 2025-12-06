import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticles() {
    return this.prisma.article.findMany({
      include: {
        paragraphs: true,
      },
      orderBy: {
        publicationDate: 'desc',
      },
    });
  }

  async getArticleById(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        paragraphs: {
          orderBy: { position: 'asc' },
        },
      },
    });
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
