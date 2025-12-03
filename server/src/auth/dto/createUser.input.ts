import { Field, InputType } from '@nestjs/graphql';
import { AuthInput } from './auth.input';
import { Role } from 'prisma/generated/prisma/enums';

@InputType()
export class CreateUserInput extends AuthInput {
  @Field()
  role?: Role;
}
