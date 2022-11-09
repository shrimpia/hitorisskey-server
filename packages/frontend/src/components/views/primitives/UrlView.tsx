import { Component, JSX } from 'solid-js';
import { A } from '@solidjs/router';

export type EmojiViewProp = {
  url: string;
} & JSX.HTMLAttributes<HTMLAnchorElement>;

export const UrlView: Component<EmojiViewProp> = (p) => {
  return (
    <A href={p.url}>{p.url}</A>
  );
};
