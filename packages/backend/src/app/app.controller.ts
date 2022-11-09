import { config } from '@/config.js';
import { Controller, GET } from 'fastify-decorators';

import { ControllerBase } from '../controller-base.js';


@Controller('/app')
export default class AppController extends ControllerBase {
  @GET('/meta')
  async readMetaAsync() {
    return {
      emojis: config.reaction_emojis,
      isClosedBeta: config.is_closed_beta,
      sponsors: config.sponsors,
    };
  }
}
