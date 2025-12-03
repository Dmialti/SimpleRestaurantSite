import { FastifyRequest } from 'fastify/types/request';
import { JwtPayload } from '../types/jwtPayload.type';
import { MercuriusContext } from 'mercurius';
import { FastifyReply } from 'fastify';
import '@fastify/cookie';

interface AuthenticatedRequest extends FastifyRequest {
  user?: JwtPayload;
}

export default interface GqlContext extends MercuriusContext {
  req: AuthenticatedRequest;
  reply: FastifyReply;
}
