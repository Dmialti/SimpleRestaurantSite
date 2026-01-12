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

    this.setCookies(context, tokens.accessToken, tokens.refreshToken);

    return {
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
    };
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async logOut(@Context() context: GqlContext) {
    const userId = context.req.user?.sub;

    if (!userId) {
      throw new ForbiddenException('User not found in request context');
    }

    await this.authService.logOut(userId);

    this.clearCookies(context);

    return true;
  }

  @Mutation(() => Boolean)
  async refresh(@Context() context: GqlContext) {
    const refreshToken = context.req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    this.setCookies(context, tokens.accessToken, tokens.refreshToken);

    return true;
  }

  private setCookies(
    context: GqlContext,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProd = process.env.NODE_ENV === 'production';

    context.reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60,
    });

    context.reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  private clearCookies(context: GqlContext) {
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict' as const,
    };

    context.reply.clearCookie('accessToken', cookieOptions);
    context.reply.clearCookie('refreshToken', cookieOptions);
  }
}
