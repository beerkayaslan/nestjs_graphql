import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginArgs } from './dto/login.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async login(@Args('input') loginArgs: LoginArgs): Promise<boolean> {
    return !!(await this.authService.login(
      loginArgs.email,
      loginArgs.password,
    ));
  }
}
