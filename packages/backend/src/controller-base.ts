import { User } from "@prisma/client";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ErrorHandler } from "fastify-decorators";

import { HitorisskeyError } from "./error.js";
import SessionService from "./session/session.service.js";

export abstract class ControllerBase {
  async getSessionUserAsync<T extends boolean>(req: FastifyRequest, throws: T) : Promise<T extends true ? User : User | null> {
    const authorization = req.headers.authorization?.trim();
    if (!authorization || !authorization.startsWith('Bearer ')) {
      if (throws) {
        throw new HitorisskeyError('MISSING_TOKEN');
      } else {
        return null as any;
      }
    }
    const token = authorization.slice('Bearer '.length);
    const user = await SessionService.getUserByTokenAsync(token);
    return user;
  }

  @ErrorHandler(HitorisskeyError)
  onError(error: HitorisskeyError, req: FastifyRequest, reply: FastifyReply) {
    reply.status(400).send({
      error: error.code,
    });
  }
}