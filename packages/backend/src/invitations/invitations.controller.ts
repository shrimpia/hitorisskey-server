import type { FastifyRequest } from "fastify";
import { Controller, DELETE, GET, POST } from "fastify-decorators";

import { ControllerBase } from "@/controller-base.js";
import InvitationsService from "./invitations.service.js";
import { HitorisskeyError } from "@/error.js";

@Controller('/invitations')
export default class PostController extends ControllerBase {
  
  @GET()
  async listAsync(req: FastifyRequest) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    return InvitationsService.listAsync();
  }
  
  @POST()
  async generateAsync(req: FastifyRequest) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    await InvitationsService.generateAsync();
    return InvitationsService.listAsync();
  }
  
  @DELETE('/:code')
  async revokeAsync(req: FastifyRequest<{Params: {code: string}}>) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    await InvitationsService.revokeAsync(req.params.code);
    return InvitationsService.listAsync();
  }
}