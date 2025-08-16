import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String, { name: 'health' })
  health(): string {
    return 'ok';
  }
}
