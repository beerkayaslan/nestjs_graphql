import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.userService.findById(id);
  }
}
