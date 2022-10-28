import { Component, createEffect, onMount } from "solid-js";

import { EmojiView } from "../../components/views/primitives/emoji-view";
import { updateClientState } from "../../store/client";

const DebugLoading: Component = () => {
  createEffect(() => {
    updateClientState({ title: 'Debug :: EmojiView' });
  });

  const text = '';

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
