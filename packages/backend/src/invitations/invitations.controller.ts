import type { FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, POST } from 'fastify-decorators';

import { ControllerBase } from '@/controller-base.js';
import InvitationsService from './invitations.service.js';
import { HitorisskeyError } from '@/error.js';
import { Invitation } from '@prisma/client';

@Controller('/invitations')
export default class InvitationController extends ControllerBase {
  
  @GET()
  async listAsync(req: FastifyRequest) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    return InvitationsService.listAsync().then(list => list.map(this.filter));
  }
  
  @POST()
  async generateAsync(req: FastifyRequest) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    await InvitationsService.generateAsync();
    return InvitationsService.listAsync().then(list => list.map(this.filter));
  }
  
  @DELETE('/:code')
  async revokeAsync(req: FastifyRequest<{Params: {code: string}}>) {
    const user = await this.getSessionUserAsync(req, true);
    if (user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    await InvitationsService.revokeAsync(req.params.code);
    return InvitationsService.listAsync().then(list => list.map(this.filter));
  }

  private filter(invitation: Invitation) {
    return {
      code: invitation.code,
      is_used: invitation.is_used,
    };
  }
}