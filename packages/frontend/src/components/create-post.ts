export interface CreatePostParam extends Record<string, unknown> {
  annotation?: string;
  content: string;
  channel: string;
}
