import { MercuriusContext } from 'mercurius';
import { FastifyReply, FastifyRequest } from 'fastify';
import '@fastify/cookie';

export default interface GqlContext extends MercuriusContext {
  req: FastifyRequest;
  reply: FastifyReply;
}
