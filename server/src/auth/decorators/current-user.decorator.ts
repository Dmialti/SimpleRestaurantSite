import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify'; // 1. Імпорт типу

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let request: FastifyRequest;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest<FastifyRequest>();
    } else {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext<{ req: FastifyRequest }>().req;
    }

    return request.user;
  },
);
