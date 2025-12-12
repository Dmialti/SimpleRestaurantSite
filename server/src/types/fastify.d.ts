import 'fastify';
import { JwtPayload } from '../auth/types/jwtPayload.type';

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload;
  }
}
