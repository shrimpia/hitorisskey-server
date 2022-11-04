import { Component, createMemo, JSX, Show } from "solid-js";
import { styled } from "solid-styled-components";
import emojiUnicode from "emoji-unicode";

export type EmojiViewProp = {
  emoji: string;
} & JSX.HTMLAttributes<HTMLImageElement>;

export const EmojiView: Component<EmojiViewProp> = (p) => {
  const url = createMemo(() => `https://twemoji.maxcdn.com/v/latest/svg/${emojiUnicode(p.emoji).replace(/ /g, '-').replace(/-fe0f/g, '')}.svg`);

  const Img = styled.img`
    height: 1em;
    vertical-align: -0.12em;
  `;

  return (
    <Img {...p} src={url()} alt={p.emoji} />
  );
};
