import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller, DELETE, GET, POST } from "fastify-decorators";
import { Post } from "@prisma/client";

import { ControllerBase } from "@/controller-base.js";
import PostService from "@/post/post.service.js";
import { HitorisskeyError } from "@/error.js";
import { createPostParam, CreatePostParam } from "@/post/models/create-post-param.js";

@Controller('/post')
export default class PostController extends ControllerBase {
  @GET('/:id')
  async readAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, false);
    return this.filter(await PostService.getPostAsync(req.params.id, session));
  }

  @GET('/channel/:channel')
  async readChannelPostsAsync(req: FastifyRequest<{Params: {channel: string}}>) {
    const session = await this.getSessionUserAsync(req, true);
    return (await PostService.getChannelPostsAsync(session, req.params.channel)).map(this.filter);
  }

  @POST()
  async createAsync(req: FastifyRequest<{Body: CreatePostParam}>) {
    if (!createPostParam.safeParse(req.body).success) throw new HitorisskeyError('MISSING_PARAMS');
    const session = await this.getSessionUserAsync(req, true);

    return this.filter(await PostService.createPostAsync(session, {
      content: req.body.content,
      annotation: req.body.annotation,
      channel: req.body.channel,
    }));
  }

  @DELETE('/:id')
  async deleteAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, true);
    throw new HitorisskeyError('NOT_IMPLEMENTED');
  }

  private filter(post: Post) {
    return {
      id: post.id,
      channel: post.channel,
      content: post.content,
      annotation: post.annotation,
    };
  }
}