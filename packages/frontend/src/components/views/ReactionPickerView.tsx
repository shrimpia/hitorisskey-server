import { Component, For } from 'solid-js';
import { styled } from 'solid-styled-components';

import { PopupView } from './PopupView';
import { EmojiView } from './primitives/EmojiView';

export type ReactionPickerViewProp = {
  show: boolean;
  x: number;
  y: number;
  onChoose: (emoji: string) => void;
  onClose: () => void;
};

export const ReactionPickerView: Component<ReactionPickerViewProp> = (p) => {
  const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `;

  const EmojiButton = styled.button`
    width: 50px;
    height: 50px;
  `;

  const emojis = [
    '👍',
    '❤',
    '😆',
    '😇',
    '😮',
    '🎉',
    '👏',
    '🍣',
    '🍮',
    '🙏',
    '🤯',
    '🥴',
    '⭐',
    '🍵',
    '🎂',
    '😌',
    '🥺',
    '😭',
    '😴',
    '🥶'
  ];

  return (
    <PopupView show={p.show} x={p.x} y={p.y} onClose={() => p.onClose()}>
      <div class="pa-1 text-dimmed">絵文字を選択してください。</div>
      <ButtonGrid class="pa-1">
        <For each={emojis} children={e => (
          <EmojiButton class="btn flat pa-0 text-150" onClick={() => {
            p.onChoose(e);
            p.onClose();
          }}>
            <EmojiView emoji={e} />
          </EmojiButton>
        )} />
      </ButtonGrid>
    </PopupView>
  );
};