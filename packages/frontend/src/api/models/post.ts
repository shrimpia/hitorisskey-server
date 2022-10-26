export interface Post {
  id: string;
  channel: string;
  content: string;
  annotation: string | null;
  isMine: boolean;
}
