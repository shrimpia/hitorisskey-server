import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller, DELETE, GET, POST } from "fastify-decorators";
import { Post, User } from "@prisma/client";

import { ControllerBase } from "@/controller-base.js";
import PostService from "@/post/post.service.js";
import { HitorisskeyError } from "@/error.js";
import { createPostParam, CreatePostParam } from "@/post/models/create-post-param.js";

@Controller('/post')
export default class PostController extends ControllerBase {
  @GET('/:id')
  async readAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, false);
    return this.filter(await PostService.getPostAsync(req.params.id, session), session);
  }

  @GET('/channel/:channel')
  async readChannelPostsAsync(req: FastifyRequest<{Params: {channel: string}}>) {
    const session = await this.getSessionUserAsync(req, true);
    return (await PostService.getChannelPostsAsync(session, req.params.channel)).map(p => this.filter(p, session));
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

    await PostService.deletePostAsync(req.params.id, session);
    
    return {
      ok: true,
    };
  }

  private filter(post: Post, user?: User | null) {
    return {
      id: post.id,
      channel: post.channel,
      content: post.content,
      annotation: post.annotation,
      isMine: user != null && user.id === post.author_id,
    };
  }
}