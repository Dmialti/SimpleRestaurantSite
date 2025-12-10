import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateArticleInput } from './dto/update-article.input';
import { ArticlePayload } from './entities/batch-payload.entity';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articlesService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Query(() => Article, { name: 'article' })
  getArticleById(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.getArticleById(id);
  }

  @Mutation(() => Article)
  @UseGuards(AuthGuard)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articlesService.createArticle(createArticleInput);
  }

  @Mutation(() => Article)
  @UseGuards(AuthGuard)
  updateArticle(
    @Args('updateArticleInput') createArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.updateArticle(createArticleInput);
  }

  @Mutation(() => Article)
  @UseGuards(AuthGuard)
  deleteArticleById(@Args('id') id: number) {
    return this.articlesService.deleteArticleById(id);
  }

  @Mutation(() => ArticlePayload)
  @UseGuards(AuthGuard)
  deleteArticles(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.articlesService.deleteArticles(ids);
  }
}
