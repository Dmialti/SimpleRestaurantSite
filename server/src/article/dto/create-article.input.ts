import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class CreateParagraphInput {
  @Field()
  name: string;

  @Field()
  content: string;

  @Field(() => Int)
  position: number;
}

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
