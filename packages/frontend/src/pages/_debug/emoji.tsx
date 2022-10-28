import { Component } from "solid-js";

import { EmojiView } from "../../components/views/primitives/emoji-view";
import { useTitle } from "../../hooks/use-title";

const DebugLoading: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'EmojiView']);

  return (
    <div class="text-200">
      <EmojiView emoji="🦐" />
      <EmojiView emoji="🫠" />
      <EmojiView emoji="🥦" />
      <EmojiView emoji="🚀" />
      <EmojiView emoji="❤️‍🔥" />
      <EmojiView emoji="👨‍👩‍👦‍👦" />
      ねこ
    </div>
  );
};

export default DebugLoading;
