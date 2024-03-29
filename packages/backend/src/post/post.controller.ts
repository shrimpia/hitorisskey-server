import type { FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, POST } from 'fastify-decorators';
import { User } from '@prisma/client';

import { ControllerBase } from '@/controller-base.js';
import PostService from '@/post/post.service.js';
import { HitorisskeyError } from '@/error.js';
import { createPostParam, CreatePostParam } from '@/post/models/create-post-param.js';
import { paginationQuery, PaginationQuery } from './models/pagination-query.js';
import { addReactionParam, AddReactionParam } from './models/add-reaction-param.js';
import { PostWithReactions } from './models/post-with-reactions.js';

@Controller('/post')
export default class PostController extends ControllerBase {
  @GET('/:id')
  async readAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, false);
    return this.filter(await PostService.getPostAsync(req.params.id, session), session);
  }

  @GET('/channel/:channel')
  async readChannelPostsAsync(req: FastifyRequest<{Params: {channel: string}, Querystring: PaginationQuery}>) {
    const session = await this.getSessionUserAsync(req, true);
    switch (req.params.channel) {
    case 'public': {
      return (await PostService.getPublicChannelPostsAsync(session)).map(p => this.filter(p, session));
    }
    case 'private': {
      const q = paginationQuery.safeParse(req.query);
      if (!q.success) throw new HitorisskeyError('MISSING_PARAMS');
      const {cursor, limit} = q.data;
      return (await PostService.getPrivateChannelPostsAsync(session, cursor, limit)).map(p => this.filter(p, session, true));
    }
    case 'realtime': {
      const q = paginationQuery.safeParse(req.query);
      if (!q.success) throw new HitorisskeyError('MISSING_PARAMS');
      const {cursor, limit} = q.data;
      return (await PostService.getRealtimeChannelPostsAsync(session, cursor, limit)).map(p => this.filter(p, session, true));
    }
    case 'announce': {
      const q = paginationQuery.safeParse(req.query);
      if (!q.success) throw new HitorisskeyError('MISSING_PARAMS');
      const {cursor, limit} = q.data;
      return (await PostService.getAnnounceChannelPostsAsync(session, cursor, limit)).map(p => this.filter(p, session, true));
    }
    case 'myself': {
      const q = paginationQuery.safeParse(req.query);
      if (!q.success) throw new HitorisskeyError('MISSING_PARAMS');
      const {cursor, limit} = q.data;
      return (await PostService.getMyPostsAsync(session, cursor, limit)).map(p => this.filter(p, session, true));
    }
    default: {
      // TODO: カスタムチャンネルをサポートする
      throw new HitorisskeyError('MISSING_PARAMS');
    }
    }
  }

  @POST()
  async createAsync(req: FastifyRequest<{Body: CreatePostParam}>) {
    if (!createPostParam.safeParse(req.body).success) throw new HitorisskeyError('MISSING_PARAMS');
    const session = await this.getSessionUserAsync(req, true);

    return this.filter(await PostService.createPostAsync(session, {
      content: req.body.content,
      annotation: req.body.annotation,
      channel: req.body.channel,
    }), session);
  }

  @DELETE('/:id')
  async deleteAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, true);

    await PostService.deletePostAsync(req.params.id, session);
    
    return {
      ok: true,
    };
  }

  @POST('/:id/reactions')
  async addReactionAsync(req: FastifyRequest<{Params: {id: string}, Body: AddReactionParam}>) {
    if (!addReactionParam.safeParse(req.body).success) throw new HitorisskeyError('MISSING_PARAMS');
    const session = await this.getSessionUserAsync(req, true);

    await PostService.addReactionAsync(session, req.params.id, req.body.emoji);
    return this.filter(await PostService.getPostAsync(req.params.id, session), session);
  }

  @DELETE('/:id/reactions')
  async removeReactionAsync(req: FastifyRequest<{Params: {id: string}}>) {
    const session = await this.getSessionUserAsync(req, true);

    await PostService.removeReactionAsync(session, req.params.id);
    return this.filter(await PostService.getPostAsync(req.params.id, session), session);
  }

  private filter(post: PostWithReactions, user?: User | null, includesCreateAt?: boolean) {
    return {
      id: post.id,
      channel: post.channel,
      content: post.content,
      annotation: post.annotation,
      reactions: post.reactions.map(r => ({
        emoji: r.emoji,
        isMine: user != null && user.id === r.author_id,
      })),
      isMine: user != null && user.id === post.author_id,
      created_at: includesCreateAt ? post.created_at : undefined,
    };
  }
}