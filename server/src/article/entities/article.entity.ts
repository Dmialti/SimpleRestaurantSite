import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Paragraph {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  content: string;

  @Field(() => Int)
  position: number;
}

@ObjectType()
export class Article {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  publicationDate: Date;

  @Field()
  imageSrc: string;

  @Field(() => [Paragraph], { nullable: true })
  paragraphs?: Paragraph[];
}
