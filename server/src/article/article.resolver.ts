import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { Paragraph } from './entities/paragraph.enitity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articlesService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Mutation(() => Article)
  @UseGuards(AuthGuard)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articlesService.create(createArticleInput);
  }

  @ResolveField(() => [Paragraph])
  async paragraphs(@Parent() article: Article) {
    return this.articlesService.getParagraphsByArticleId(article.id);
  }
}
