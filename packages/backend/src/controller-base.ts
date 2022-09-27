import type { FastifyReply, FastifyRequest } from "fastify";
import { ErrorHandler } from "fastify-decorators";

import { errors, HitorisskeyError } from "./error.js";
import SessionService from "./session/session.service.js";

export abstract class ControllerBase {
  async getSessionUserAsync(req: FastifyRequest) {
    const authorization = req.headers.authorization?.trim();
    if (!authorization) throw new HitorisskeyError('MISSING_TOKEN');
    if (!authorization.startsWith('Bearer ')) throw new HitorisskeyError('MISSING_TOKEN');
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