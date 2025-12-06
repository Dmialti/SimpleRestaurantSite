import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Paragraph } from './paragraph.enitity';

@ObjectType()
export class Article {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  publicationDate: Date;

  @Field()
  imageSrc: string;

  @Field(() => [Paragraph], { nullable: true })
  paragraphs?: Paragraph[];
}
