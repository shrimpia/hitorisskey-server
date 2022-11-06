import { CreatePostParam } from "./params/create-post";
import { Post } from "./models/post";
import { User } from "./models/user";
import { $get, $post, $delete } from "./primitives";
import { AppMeta } from "./models/app-meta";
import { Invitation } from "./models/invitation";

/**
 * ひとりすきー API。
 */
export const api = {
  app: {
    readMetaAsync: () => $get<AppMeta>('app/meta'),
  },

  /**
   * アカウント API。
   */
  session: {
    /**
     * セッション情報を取得します。
     */
    readAsync: () => $get<User>('session'),

    /**
     * アカウントを新規作成します。
     */
    startAsync: (invitationCode?: string) => $post<User>('session/start', invitationCode ? { invitationCode } : undefined),
    
    /**
     * メールアドレスとパスワードを用いて、アカウントにログインします。
     * @param {string} email - メールアドレス
     * @param {string} password - パスワード
     */
    loginAsync: (email: string, password: string) => $post<User>('session/login', {
      email, password,
    }),
    
    /**
     * メールアドレスとパスワードを現在のアカウントに設定します。
     * @param {string} email - メールアドレス
     * @param {string} password - パスワード
     */
    signupAsync: (email: string, password: string) => $post<User>('session/signup', {
      email, password,
    }),
  },

  /**
   * つぶやき API。
   */
  post: {
    /**
     * つぶやきを取得します。
     * @param {string} id - つぶやき ID。
     */
    readAsync: (id: string) => $get<Post>(`post/${id}`),
    /**
     * チャンネルの投稿を全取得します。
     * @param {string} channel - チャンネル ID。
     * @param {string?} cursor - ページネーション カーソル。
     * @param {number?} limit - 取得数。
     */
    readChannelPostsAsync: (channel: string, cursor?: string, limit?: number) => $get<Post[]>(`post/channel/${channel}`, { cursor, limit }),

    /**
     * つぶやきを作成します。
     * @param {CreatePostParam} args - つぶやき。
     */
    createAsync: (args: CreatePostParam) => $post<Post>('post', args),

    /**
     * 指定したつぶやきを削除します。
     * @param {string} id - つぶやき ID。
     */
    deleteAsync: (id: string) => $delete<Post>(`post/${id}`),

    /**
     * リアクション API。
     */
    reactions: {
      /**
       * リアクションを追加します。
       * @param {string} postId - つぶやき ID。
       * @param {string} emoji - リアクション絵文字。
       */
      addAsync: (postId: string, emoji: string) => $post<Post>(`post/${postId}/reactions`, {
        emoji,
      }),
      /**
       * リアクションを削除します。
       * @param {string} postId - つぶやき ID。
       */
      removeAsync: (postId: string) => $delete<Post>(`post/${postId}/reactions`),
    },
  },

  invitations: {
    listAsync: () => $get<Invitation[]>('invitations'),

    generateAsync: () => $post<Invitation[]>('invitations'),

    revokeAsync: (code: string) => $delete<Invitation[]>(`invitations/${code}`),
  },
};
