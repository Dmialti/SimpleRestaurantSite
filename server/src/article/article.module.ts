import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ArticleResolver, ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
