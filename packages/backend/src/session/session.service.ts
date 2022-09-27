import { User } from "@prisma/client";
import rndstr from "rndstr";
import * as bcrypt from 'bcrypt';

import prisma from "@/prisma.js";
import { HitorisskeyError } from "@/error.js";

export default class SessionService {
  /**
   * トークンを生成します。
   * @return {string} トークン。
   */
  static generateToken(): string {
    return rndstr({length: this.TOKEN_LENGTH, chars: this.TOKEN_PATTERN});
  }

  /**
   * 指定したトークンを用いるユーザーを取得します。
   * @param {string} [token] - 認証トークン。
   * @return {Promise<User>} トークンに対応するユーザー情報。
   */
  static getUserByTokenAsync(token: string): Promise<User> {
    try {
      return prisma.user.findUniqueOrThrow({
        where: {token},
      });
    } catch (_) {
      throw new HitorisskeyError('INVALID_TOKEN');
    }
  }

  /**
   * 指定したメールアドレスとパスワードでログインを試みます。
   * @param {string} [email] - メールアドレス。
   * @param {string} [password] - パスワード。
   * @return {Promise<User>} ログインに成功したユーザー情報。
   */
  static async loginAsync(email: string, password: string): Promise<User> {
    const u = await prisma.user.findFirst({where: {email}});
    if (!u) throw new HitorisskeyError('NOT_FOUND');
    const hashedPassword = await this.hashPasswordAsync(password);
    if (u.hashedPassword !== hashedPassword) throw new HitorisskeyError('NOT_FOUND');
    
    return u;
  }

  /**
   * 指定したメールアドレスとパスワードを、ユーザーに設定します。
   * @param {string | User} [tokenOrUser] - トークンまたはユーザー。
   * @param {string} [email] - メールアドレス。
   * @param {string} [password] - パスワード。
   * @return {Promise<User>} メールアドレスおよびパスワードを設定したユーザー情報。
   */
  static async signupAsync(tokenOrUser: string | User, email: string, password: string): Promise<User> {
    const user = typeof tokenOrUser === 'object' ? tokenOrUser : await this.getUserByTokenAsync(tokenOrUser);
    
    const userUsingSameEmail = await prisma.user.findFirst({where: {email}});
    if (userUsingSameEmail) throw new HitorisskeyError('EMAIL_DUPLICATED');
    
    const hashedPassword = await this.hashPasswordAsync(password);

    return prisma.user.update({
      where: {id: user.id},
      data: { email, hashedPassword },
    });
  }

  /**
   * パスワードをハッシュ化します。
   * @param {string} [password] - ハッシュするパスワード。
   * @return {Promise<string>} ハッシュ化したパスワード。
   */
  static hashPasswordAsync(password: string): Promise<string> {
    return bcrypt.hash(password, this.HASH_SALT_ROUND);
  }

  private static readonly TOKEN_LENGTH = 64;
  private static readonly TOKEN_PATTERN = 'a-zA-Z0-9';
  private static readonly HASH_SALT_ROUND = 32;
}
