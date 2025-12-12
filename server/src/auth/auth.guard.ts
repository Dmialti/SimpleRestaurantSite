import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: FastifyRequest;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest<FastifyRequest>();
    } else {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext<{ req: FastifyRequest }>().req;
    }

    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException('Token is incorrect or expired');
    }

    return true;
  }

  private extractToken(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
