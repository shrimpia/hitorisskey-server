import { Post, User } from "@prisma/client";

import prisma from "@/prisma.js";
import { HitorisskeyError } from "@/error.js";
import { CreatePostParam } from "./models/create-post-param.js";
import { ulid } from "ulid";

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
   * チャンネル投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getChannelPostsAsync(user: User, channel: string): Promise<Post[]> {
    return prisma.post.findMany({
      where: { channel },
      orderBy: { created_at: 'desc' },
      take: 20,
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

  static readonly BUILTIN_CHANNELS = {
    private: 'private',
    public: 'public',
    realtime: 'realtime',
   } as const;
}