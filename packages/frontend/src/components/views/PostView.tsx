import dayjs from 'dayjs';
import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import { api } from '../../api';
import { Post } from '../../api/models/post';
import { Reaction } from '../../api/models/Reaction';
import { HitorisskeyEvent, hitorisskeyEventTarget } from '../../misc/event';
import { getChannelNameLocalized } from '../../misc/get-channel-name-localized';
import { MenuDefinition } from '../../misc/menu-definition';
import { openMenu } from '../../store/popup-menu';
import { session } from '../../store/session';
import { $t } from '../../text';
import { EmojiView } from './primitives/EmojiView';
import { FormattedTextView } from './primitives/FormattedTextView';
import { ReactionPickerView } from './ReactionPickerView';

export type PostProp = {
  post: Post;
  showChannelName?: boolean;
};

type GroupedReaction = Reaction & {
  count: number;
};

export const PostView: Component<PostProp> = (p) => {
  const [isVisibleReactionPicker, setVisibleReactionPicker] = createSignal(false);
  const [reactionViewLocation, setReactionViewLocation] = createSignal([0, 0]);
  const [isVisibleBody, setVisibleBody] = createSignal(false);

  const ReactionView = styled.button<{active: boolean}>`
    border-radius: var(--radius);
    color: ${p => p.active ? 'var(--hs-reaction-fg-active)' : 'var(--hs-reaction-fg)'};
    padding: 6px 8px;
    background: ${p => p.active ? 'var(--hs-reaction-bg-active)' : 'var(--hs-reaction-bg)'};
    ${p => p.active ? `
    > img {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    ` : ''}

    &:hover {
      background: ${p => p.active ? 'var(--hs-reaction-bg-active-hover)' : 'var(--hs-reaction-bg-hover)'};
    }
  `;

  const CwButton = styled.button`
    border-radius: 3px;
    padding: 4px 8px;
    margin-left: 4px;
    background: var(--tone-5);
    color: var(--tone-20);
    font-size: 0.8em;

    &:hover {
      background: var(--tone-8);
    }
  `;

  const menu = () => {
    const m: MenuDefinition = [];
    if (p.post.isMine) {
      m.push({
        items: [{
          label: $t.$postView.delete,
          danger: true,
          iconClass: 'fas fa-trash-alt fa-fw',
          onClick() {
            if (confirm('本当にこのつぶやきを削除しますか？')) {
              api.post.deleteAsync(p.post.id).then(() => {
                hitorisskeyEventTarget.dispatchEvent(new HitorisskeyEvent('postDelete', {
                  detail: { id: p.post.id }
                }));
              });
            }
          },
        }, {
          label: $t.$postView.changeVisibility,
          iconClass: 'fas fa-lock fa-fw',
          disabled: true,
        }]
      });
    }
    m.push({
      items: [{
        label: $t.$postView.report,
        iconClass: 'fas fa-exclamation-circle fa-fw',
        disabled: true,
      }]
    });
    return m;
  };

  const reactions = createMemo(() => p.post.reactions.reduce((prev, current) => {
    const group = prev.find(g => g.emoji === current.emoji);
    if (group) {
      group.count++;
      if (current.isMine) group.isMine = true;
    } else {
      prev.push({
        ...(current),
        count: 1,
      });
    }
    return prev;
  }, [] as GroupedReaction[]));

  const emitPostReactionsUpdate = (post: Post) => {
    hitorisskeyEventTarget.dispatchEvent(new HitorisskeyEvent('postUpdate', {
      detail: {
        id: post.id,
        diff: {
          reactions: post.reactions,
        },
      },
    }));
  };

  const onClickReact = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setReactionViewLocation([rect.left, rect.bottom + 8]);
    setVisibleReactionPicker(true);
  };

  const onClickMore = (e: MouseEvent) => {
    openMenu(menu(), e.currentTarget as HTMLElement);
  };

  const onChooseEmoji = (emoji: string) => {
    api.post.reactions.addAsync(p.post.id, emoji).then(emitPostReactionsUpdate);
  };

  const onClickReactionButton = (reaction: GroupedReaction) => {
    if (reaction.isMine) {
      api.post.reactions.removeAsync(p.post.id).then(emitPostReactionsUpdate);
    } else {
      api.post.reactions.addAsync(p.post.id, reaction.emoji).then(emitPostReactionsUpdate);
    }
  };

  return (
    <div class="card hs-post">
      <div class="body">
        <div class="ml-1 mb-1">
          <Show when={p.post.annotation}>
            <div class="mb-1">
              <FormattedTextView inline children={p.post.annotation} />
              <CwButton class="clickable" onClick={() => setVisibleBody(f => !f)}>
                {isVisibleBody() ? '閉じる' : '続きを読む'}
              </CwButton>
            </div>
          </Show>
          <Show when={!p.post.annotation || isVisibleBody()}>
            <FormattedTextView children={p.post.content}/>
          </Show>
        </div>
        <Show when={p.showChannelName}>
          <aside class="text-75 text-dimmed mb-1 ml-1"><i class="fas fa-hashtag fa-fw" /> {getChannelNameLocalized(p.post.channel)}</aside>
        </Show>
        <Show when={p.post.reactions.length > 0}>
          <div class="hstack slim mt-2 mb-1">
            <For each={reactions()} children={r => (
              <ReactionView class="clickable" active={r.isMine} onClick={() => onClickReactionButton(r)}>
                <EmojiView emoji={r.emoji} /> {r.count}
              </ReactionView>
            )} />
          </div>
        </Show>
        <div class="hstack">
          <button class="btn flat" onClick={onClickReact}>
            <i class="far fa-face-smile" />
          </button>
          <Show when={p.post.channel !== 'announce' || session.user?.role === 'Admin'}>
            <button class="btn flat" onClick={onClickMore}>
              <i class="fas fa-ellipsis" />
            </button>
          </Show>
          <Show when={p.post.created_at}>
            <div class="ml-auto my-auto text-dimmed">
              {dayjs(p.post.created_at).fromNow()}
            </div>
          </Show>
        </div>
      </div>
      <ReactionPickerView
        x={reactionViewLocation()[0]}
        y={reactionViewLocation()[1]}
        show={isVisibleReactionPicker()}
        onClose={() => setVisibleReactionPicker(false)}
        onChoose={onChooseEmoji}
      />
    </div>
  );
};
