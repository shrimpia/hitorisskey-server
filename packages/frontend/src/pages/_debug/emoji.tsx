import { Component } from 'solid-js';
import { ShowWhenDev } from '../../components/util/ShowWhenDev';

import { EmojiView } from '../../components/views/primitives/EmojiView';
import { useTitle } from '../../hooks/use-title';

const DebugLoading: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'EmojiView']);

  return (
    <ShowWhenDev>
      <div class="text-200">
        <EmojiView emoji="🦐" />
        <EmojiView emoji="🫠" />
        <EmojiView emoji="🥦" />
        <EmojiView emoji="🚀" />
        <EmojiView emoji="❤️‍🔥" />
        <EmojiView emoji="👨‍👩‍👦‍👦" />
      ねこ
      </div>
    </ShowWhenDev>
  );
};

export default DebugLoading;
