import { Reaction } from './Reaction';

export interface Post {
  id: string;
  channel: string;
  content: string;
  annotation: string | null;
  reactions: Reaction[];
  isMine: boolean;
}
