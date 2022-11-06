import { Component } from "solid-js";

import { EmojiView } from "../../components/views/primitives/EmojiView";
import { IS_DEVELOPMENT } from "../../global-const";
import { useTitle } from "../../hooks/use-title";
import NotFound from "../[...all]";

const DebugLoading: Component = () => {
  if (!IS_DEVELOPMENT) return <NotFound />

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
