import { Field, InputType } from '@nestjs/graphql';
import { CreateParagraphInput } from './create-paragraph.input';

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
