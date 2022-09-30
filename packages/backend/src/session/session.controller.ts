import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";
import { User } from "@prisma/client";

import { ControllerBase } from "@/controller-base.js";
import { HitorisskeyError } from "@/error.js";
import SessionService from "@/session/session.service.js";
import UserService from "@/user/user.service.js";

@Controller('/session')
export default class SessionController extends ControllerBase {
  @GET()
  async readAsync(req: FastifyRequest, reply: FastifyReply) {
    const user = await this.getSessionUserAsync(req, true);
    reply.send(this.filter(user));
  }

  @POST('/start')
  async startAsync(req: FastifyRequest, reply: FastifyReply) {
    const user = await UserService.createUserAsync();
    reply.send(this.filter(user));
  }

  @POST('/login')
  async loginAsync({body}: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) {
    if (!body || !body.email || !body.password) throw new HitorisskeyError('MISSING_PARAMS');
    
    const u = await SessionService.loginAsync(body.email, body.password);
    reply.send(this.filter(u));
  }

  @POST('/signup')
  async signupAsync(req: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) {
    const user = await this.getSessionUserAsync(req, true);
    if (!req.body || !req.body.email || !req.body.password) throw new HitorisskeyError('MISSING_PARAMS');
    
    const u = await SessionService.signupAsync(user, req.body.email, req.body.password);
    reply.send(this.filter(u));
  }

  private filter(user: User) {
    return {
      id: user.id,
      created_at: user.created_at,
      email: user.email,
      token: user.token
    };
  }
}
