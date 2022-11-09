import { Component, createMemo, createSignal, For, JSX, Show } from 'solid-js';
import { css, styled } from 'solid-styled-components';

import { api } from '../../api';
import { Post } from '../../api/models/post';
import { annotationTemplates } from '../../misc/annotation-templates';
import { clientState, updateClientState } from '../../store/client';
import { $t } from '../../text';

export type PostComposerView = {
  channel: string;
  onCreatePost?: (post: Post) => void;
};

export const PostComposerView: Component<PostComposerView> = (p) => {
  const [isEnableCw, setEnableCw] = createSignal(false);
  const [content, setContent] = createSignal('');
  const [annotation, setAnnotation] = createSignal('');
  const lengthRemaining = createMemo(() => 1024 - content().length);
  const canPost = createMemo(() => (!isEnableCw() || annotation().length > 0) && content().length > 0 && content().length <= 1024);
  const [isProcessing, setProcessing] = createSignal(false);

  const OpenButton = styled.button`
    position: fixed;
    bottom: var(--margin);
    right: var(--margin);
    height: 56px;
    background: var(--hs-bg-post-button);
    color: var(--hs-fg-post-button);
    border: 1px solid var(--hs-border-post-button);
    border-radius: 14px;
    z-index: 10000;
  `;

  const Container = styled.div<{isMobile: boolean}>`
    position: fixed;
    z-index: 10000;
    ${p => !p.isMobile ? `
      bottom: var(--margin);
      right: var(--margin);
      max-width: 640px;
      width: calc(100% - 48px);
    ` : `
      bottom: 0;
      right: 0;
      width: 100%;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    `}
  `;
	
  const Textarea = styled.textarea`
		height: 7em;
	`;

  const post = () => {
    setProcessing(true);
    api.post.createAsync({
      channel: p.channel,
      content: content(),
      annotation: isEnableCw() ? annotation() : undefined,
    }).then((post) => {
      setContent('');
      if (!isEnableCw()) {
        setAnnotation('');
      }
      if (p.onCreatePost) p.onCreatePost(post);
    }).catch(e => {
      alert(e);
    }).finally(() => {
      setProcessing(false);
    });
  };

  const onKeyPressTextArea = (e: KeyboardEvent) => {
    if (!canPost() || e.key !== 'Enter' || !(e.ctrlKey || e.metaKey)) return;
    post();
  };
  return (
    <Show when={clientState.isOpenPostComposer} fallback={(
      <OpenButton class="clickable shadow-4 px-2" onClick={() => updateClientState({isOpenPostComposer: true})}>
        <i class="fas fa-pen-to-square fa-fw"/> {$t.createPost}
      </OpenButton>
    )}>
      <Container class={`card pa-2 shadow-4`} isMobile={clientState.isMobile}>
        {isEnableCw() ? (
          <div class="hstack dense">
          <button class="btn flat pa-1 mr-1" onClick={() => setEnableCw(false)} disabled={isProcessing()}><i class="fas fa-times"/></button>
          <input type="text" list="cwTemplates" class="input-field" placeholder={$t.$postComposerView.annotation} disabled={isProcessing()} value={annotation()} onInput={e => setAnnotation(e.currentTarget.value)} />
          <datalist id="cwTemplates">
            <For each={annotationTemplates} children={c => <option value={c} />} />
          </datalist>
          </div>
        ) : (
          <button class="btn flat text-left px-1 text-dimmed" onClick={() => setEnableCw(true)} disabled={isProcessing()}>
          <i class="fas fa-eye-slash"/> {$t.$postComposerView.hideContent}
          </button>
        )}
        <Textarea class="input-field mt-1" placeholder={$t.$postComposerView.placeholder} disabled={isProcessing()} value={content()} onInput={e => setContent(e.currentTarget.value)} onKeyDown={onKeyPressTextArea} />
        <div class="hstack dense f-right f-middle mt-1">
          <div class="text-bold mr-1">{lengthRemaining()}</div>
          <button class="btn primary" disabled={!canPost() || isProcessing()} onClick={post}>
          {isProcessing() ? $t.$postComposerView.posting : $t.$postComposerView.post}
          </button>
          <button class="btn flat ml-1 pa-1" onClick={() => updateClientState({isOpenPostComposer: false})}>
          <i class="fas fa-chevron-down" />
          </button>
        </div>
      </Container>
    </Show>
  );
};
