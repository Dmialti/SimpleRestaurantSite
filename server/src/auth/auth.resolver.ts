import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/authResponse.entity';
import { AuthInput } from './dto/auth.input';
import type GqlContext from './interfaces/MercuriusContext.interface';
import {
  ForbiddenException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async logIn(@Args('input') input: AuthInput, @Context() context: GqlContext) {
    const tokens = await this.authService.logIn(input);

    this.setCookie(context, tokens.refreshToken);

    return { accessToken: tokens.accessToken };
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async logout(@Context() context: GqlContext) {
    const userId = context.req.user?.sub;

    if (!userId) {
      throw new ForbiddenException('User not found in request context');
    }

    await this.authService.logOut(userId);

    context.reply.clearCookie('refresh_token', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return true;
  }

  @Mutation(() => AuthResponse)
  async signUp(@Args('input') input: AuthInput) {
    await this.authService.signUp(input);
  }

  @Mutation(() => AuthResponse)
  async refresh(@Context() context: GqlContext) {
    const refreshToken = context.req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    this.setCookie(context, tokens.refreshToken);

    return { accessToken: tokens.accessToken };
  }

  private setCookie(context: GqlContext, refreshToken: string) {
    context.reply.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
  }
}
