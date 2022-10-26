import { Post, User } from "@prisma/client";
import { ulid } from "ulid";

import prisma from "@/prisma.js";
import { HitorisskeyError } from "@/error.js";
import { CreatePostParam } from "./models/create-post-param.js";

export default class PostService {
  /**
   * つぶやきを取得します。
   * 非公開つぶやきを取得するためには、そのつぶやきの投稿者のトークンが必要です。
   * @param {string} postId - つぶやきのID
   * @param {User | null} user - つぶやきを取得するユーザー
   * @return {Promise<Post>} 投稿
   */
  static async getPostAsync(postId: string, user: User | null): Promise<Post> {
    const post = await prisma.post.findUnique({where: {id: postId}});
    if (!post) throw new HitorisskeyError('NOT_FOUND');

    if (post.channel === this.BUILTIN_CHANNELS.private) {
      // 他者は非公開つぶやきを見ることはできない
      if (!user || user.id !== post.author_id) throw new HitorisskeyError('NOT_FOUND');
    }
    return post;
  }

  /**
   * プライベートルームチャンネルの投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @param {string} cursor - ページネーションの基点。
   * @param {number} limit - 取得数。
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getPrivateChannelPostsAsync(user: User, cursor?: string, limit: number = 10): Promise<Post[]> {
    return prisma.post.findMany({
      where: {
        channel: 'private',
        author_id: user.id,
      },
      orderBy: { created_at: 'desc' },
      cursor: cursor ? {id: cursor} : undefined,
      skip: cursor ? 1 : 0,
      take: limit,
    });
  }

  /**
   * みんなのつぶやきチャンネルの投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getPublicChannelPostsAsync(user: User): Promise<Post[]> {
    return prisma.post.findMany({
      where: { channel: 'public' },
      orderBy: { created_at: 'desc' },
      take: 100,
    });
  }

  /**
   * なう！広場チャンネルの投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @param {string} cursor - ページネーションの基点。
   * @param {number} limit - 取得数。
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getRealtimeChannelPostsAsync(user: User, cursor?: string, limit: number = 10): Promise<Post[]> {
    // TODO 24時間以内に留める
    return prisma.post.findMany({
      where: { channel: 'realtime' },
      orderBy: { created_at: 'desc' },
      cursor: cursor ? {id: cursor} : undefined,
      skip: cursor ? 1 : 0,
      take: limit,
    });
  }

  static async createPostAsync(user: User, post: CreatePostParam): Promise<Post> {
    const channels: string[] = Object.values(this.BUILTIN_CHANNELS);
    // カスタムチャンネルの一覧も流し込む
    channels.push(...(await prisma.customChannel.findMany({
      select: {
        name: true,
      }
    })).map(c => c.name));
    if (!channels.includes(post.channel)) throw new HitorisskeyError('NO_SUCH_CHANNEL');

    if (post.content.length === 0) throw new HitorisskeyError('MISSING_PARAMS');
    if (post.content.length > 1024) throw new HitorisskeyError('CONTENT_TOO_LONG');

    return prisma.post.create({
      data: {
        id: ulid(),
        author_id: user.id,
        channel: post.channel,
        content: post.content,
        annotation: post.annotation,
      }
    });
  }

  static async deletePostAsync(postId: string, user: User): Promise<void> {
    // これがエラーにならない（=投稿が存在し、userのノートである)→投稿を削除できる
    await this.getPostAsync(postId, user);

    await prisma.post.delete({
      where: {id: postId}
    });
  }

  static readonly BUILTIN_CHANNELS = {
    private: 'private',
    public: 'public',
    realtime: 'realtime',
   } as const;
}