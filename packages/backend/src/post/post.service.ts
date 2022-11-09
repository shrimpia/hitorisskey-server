import { Reaction, User } from '@prisma/client';
import { ulid } from 'ulid';
import dayjs from 'dayjs';

import prisma from '@/prisma.js';
import { HitorisskeyError } from '@/error.js';
import { CreatePostParam } from './models/create-post-param.js';
import { PostWithReactions } from './models/post-with-reactions.js';

export default class PostService {
  /**
   * つぶやきを取得します。
   * 非公開つぶやきを取得するためには、そのつぶやきの投稿者のトークンが必要です。
   * @param {string} postId - つぶやきのID
   * @param {User | null} user - つぶやきを取得するユーザー
   * @return {Promise<Post>} 投稿
   */
  static async getPostAsync(postId: string, user: User | null): Promise<PostWithReactions> {
    const post = await prisma.post.findUnique({
      where: {id: postId},
      include: {
        reactions: true,
      }
    });
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
  static async getPrivateChannelPostsAsync(user: User, cursor?: string, limit = 10): Promise<PostWithReactions[]> {
    return prisma.post.findMany({
      where: {
        channel: 'private',
        author_id: user.id
      },
      include: {
        reactions: true,
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
  static async getPublicChannelPostsAsync(user: User): Promise<PostWithReactions[]> {
    const fetchedPosts = await prisma.post.findMany({
      where: {
        channel: 'public',
        author: {
          OR: [{
            is_banned: false,
            is_silenced: false,
          }, {
            id: user.id,
          }],
        },
      },
      include: {
        reactions: true,
      },
      orderBy: { created_at: 'desc' },
      take: 100,
    });
    this.shuffle(fetchedPosts);
    return fetchedPosts.slice(0, 20);
  }

  /**
   * なう！広場チャンネルの投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @param {string} cursor - ページネーションの基点。
   * @param {number} limit - 取得数。
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getRealtimeChannelPostsAsync(user: User, cursor?: string, limit = 10): Promise<PostWithReactions[]> {
    const b24h = dayjs().subtract(24, 'h').toDate();
    return prisma.post.findMany({
      where: {
        channel: 'realtime',
        author: {
          OR: [{
            is_banned: false,
            is_silenced: false,
          }, {
            id: user.id,
          }],
        },
        created_at: {
          gte: b24h,
        },
      },
      include: {
        reactions: true,
      },
      orderBy: { created_at: 'desc' },
      cursor: cursor ? {id: cursor} : undefined,
      skip: cursor ? 1 : 0,
      take: limit,
    });
  }

  /**
   * お知らせチャンネルの投稿を取得します。
   * @param {User} user - 投稿を取得するユーザー
   * @param {string} cursor - ページネーションの基点。
   * @param {number} limit - 取得数。
   * @returns {Promise<Post[]>} 投稿一覧。
   */
  static async getAnnounceChannelPostsAsync(user: User, cursor?: string, limit = 10): Promise<PostWithReactions[]> {
    return prisma.post.findMany({
      where: {
        channel: 'announce',
      },
      include: {
        reactions: true,
      },
      orderBy: { created_at: 'desc' },
      cursor: cursor ? {id: cursor} : undefined,
      skip: cursor ? 1 : 0,
      take: limit,
    });
  }

  static async createPostAsync(user: User, post: CreatePostParam): Promise<PostWithReactions> {
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
    
    // お知らせチャンネルは管理者以外書けない
    if (post.channel === this.BUILTIN_CHANNELS.announce && user.role !== 'Admin') throw new HitorisskeyError('PERMISSION_DENIED');

    return prisma.post.create({
      data: {
        id: ulid(),
        author_id: user.id,
        channel: post.channel,
        content: post.content,
        annotation: post.annotation,
      },
      include: {
        reactions: true,
      }
    });
  }

  static async deletePostAsync(postId: string, user: User): Promise<void> {
    // これがエラーにならない（=投稿が存在し、userのノートである)→投稿を削除できる
    const post = await this.getPostAsync(postId, user);
    if (post.author_id !== user.id) throw new HitorisskeyError('PERMISSION_DENIED');

    await prisma.post.delete({
      where: {id: postId}
    });
  }

  static async getReactionByUserAsync(user: User, id: string): Promise<Reaction> {
    const reaction = await prisma.reaction.findFirst({
      where: {
        author_id: user.id,
        post_id: id,
      },
    });
    if (!reaction) throw new HitorisskeyError('NOT_FOUND');

    return reaction;
  }

  static async addReactionAsync(user: User, id: string, emoji: string): Promise<void> {
    const reactionCount = await prisma.reaction.count({
      where: {
        author_id: user.id,
        post_id: id,
      },
    });
    if (reactionCount > 0) {
      await this.removeReactionAsync(user, id);
    }
    await prisma.reaction.create({
      data: {
        id: ulid(),
        emoji,
        author_id: user.id,
        post_id: id,
      },
    });
  }

  static async removeReactionAsync(user: User, id: string): Promise<void> {
    const reaction = await this.getReactionByUserAsync(user, id);
    await prisma.reaction.deleteMany({
      where: {
        id: reaction.id,
      },
    });
  }

  static readonly BUILTIN_CHANNELS = {
    private: 'private',
    public: 'public',
    realtime: 'realtime',
    announce: 'announce',
  } as const;

  private static shuffle(arr: unknown[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}