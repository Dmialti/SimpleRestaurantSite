import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Int, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/updateUser.input';
import { BatchPayload } from '../shared/models/batch-payload.model';

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => User, { name: 'user' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.create(createUserInput, currentUser);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.update(
      updateUserInput.id,
      updateUserInput,
      currentUser,
    );
  }

  @Mutation(() => User)
  deleteUserById(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.deleteUserById(id, currentUser);
  }

  @Mutation(() => BatchPayload)
  deleteUsers(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.deleteUsers(ids, currentUser);
  }
}
