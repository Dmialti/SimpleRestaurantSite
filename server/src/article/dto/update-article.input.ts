import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateParagraphInput } from './create-paragraph.input';

@InputType()
export class UpdateArticleInput {
  @Field(() => Int)
  id: number;

  @Field()
  name?: string;

  @Field()
  publicationDate?: Date;

  @Field()
  description?: string;

  @Field()
  imageSrc?: string;

  @Field(() => [CreateParagraphInput])
  paragraphs?: CreateParagraphInput[];
}
