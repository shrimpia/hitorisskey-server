import { config } from "@/config.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET } from "fastify-decorators";

import { ControllerBase } from "../controller-base.js";


@Controller('/app')
export default class AppController extends ControllerBase {
  @GET('/meta')
  async readMetaAsync(req: FastifyRequest, reply: FastifyReply) {
    return {
      emojis: config.reaction_emojis,
      isClosedBeta: config.is_closed_beta,
      sponsors: config.sponsors,
    };
  }
}
