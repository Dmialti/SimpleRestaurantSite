import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articlesService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Query(() => Article, { name: 'article' })
  getArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.getArticleById(id);
  }

  @Mutation(() => Article)
  @UseGuards(AuthGuard)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articlesService.create(createArticleInput);
  }
}
