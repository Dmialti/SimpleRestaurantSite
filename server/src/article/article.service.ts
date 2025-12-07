import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateArticleInput } from './dto/update-article.input';

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

  async createArticle(data: CreateArticleInput) {
    const { paragraphs, ...articleData } = data;

    return this.prisma.article.create({
      data: {
        ...articleData,
        paragraphs: paragraphs ? { create: paragraphs } : undefined,
      },
    });
  }
  async updateArticle(data: UpdateArticleInput) {
    const { paragraphs, ...articleData } = data;

    return this.prisma.$transaction(async (tx) => {
      await tx.article.update({
        where: { id: data.id },
        data: { ...articleData },
      });

      if (paragraphs) {
        await tx.paragraph.deleteMany({
          where: { articleId: data.id },
        });

        await tx.article.update({
          where: { id: data.id },
          data: {
            paragraphs: {
              create: paragraphs,
            },
          },
        });
      }

      return tx.article.findUnique({
        where: { id: data.id },
        include: { paragraphs: { orderBy: { position: 'asc' } } },
      });
    });
  }

  async deleteArticles(ids: number[]) {
    return this.prisma.article.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
  async deleteArticleById(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }

  async getParagraphsByArticleId(articleId: number) {
    return this.prisma.paragraph.findMany({
      where: { articleId },
      orderBy: { position: 'asc' },
    });
  }
}
