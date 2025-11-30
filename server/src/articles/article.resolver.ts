import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Article, Paragraph } from './entities/article.entity';
import { ArticleService } from './article.sevice';
import { CreateArticleInput } from './dto/create-article.input';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articlesService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Mutation(() => Article)
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
