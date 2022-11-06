import rndstr from "rndstr";
import { Invitation } from "@prisma/client";

import prisma from "@/prisma.js";
import { HitorisskeyError } from "@/error.js";

export default class InvitationsService {
  static async generateAsync(): Promise<void> {
    let code: string;
    
    do {
      code = rndstr({length: 8});
    } while((await prisma.invitation.findUnique({where: {code}})) !== null);

    await prisma.invitation.create({
      data: {code}
    });
  }

  static async listAsync(): Promise<Invitation[]> {
    return prisma.invitation.findMany();
  }

  static async revokeAsync(code: string): Promise<void> {
    const invitationCode = await prisma.invitation.findUnique({where: {code}});
    if (!invitationCode) throw new HitorisskeyError('NOT_FOUND');

    await prisma.invitation.delete({where: {code}});
  }

  static async tryUseAsync(code: string | null | undefined): Promise<boolean> {
    if (!code) return false;
    const invitationCode = await prisma.invitation.findUnique({where: {code}});
    if (!invitationCode || invitationCode.is_used) return false;

    await prisma.invitation.update({
      where: {code},
      data: { is_used: true }
    });

    return true;
  }
}
