import { Field, InputType } from '@nestjs/graphql';
import { CreateParagraphInput } from 'src/article/dto/create-paragraph.input';

@InputType()
export class CreateArticleInput {
  @Field()
  name: string;

  @Field()
  publicationDate: Date;

  @Field()
  description: string;

  @Field()
  imageSrc: string;

  @Field(() => [CreateParagraphInput])
  paragraphs: CreateParagraphInput[];
}
