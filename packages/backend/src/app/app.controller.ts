import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET } from "fastify-decorators";

import { ControllerBase } from "../controller-base.js";
import AppService from "./app.service.js";


@Controller('/app')
export default class AppController extends ControllerBase {
  @GET('/meta')
  async readMetaAsync(req: FastifyRequest, reply: FastifyReply) {
    return {
      emojis: AppService.getReactionEmojis(),
      isClosedBeta: AppService.isClosedBeta(),
    };
  }
}
