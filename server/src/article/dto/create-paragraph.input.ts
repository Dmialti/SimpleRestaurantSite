import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateParagraphInput {
  @Field()
  name: string;

  @Field()
  content: string;

  @Field(() => Int)
  position: number;
}
