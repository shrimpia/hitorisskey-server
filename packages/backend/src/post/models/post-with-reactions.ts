import { Post, Reaction } from "@prisma/client";

export type PostWithReactions = Post & {
  reactions: Reaction[];
};
