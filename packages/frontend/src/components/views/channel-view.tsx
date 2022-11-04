import { Component, createEffect, createMemo, createResource, createSignal, For, onCleanup, onMount, Show, Suspense } from "solid-js";

import { api } from "../../api";
import { useEvent } from "../../hooks/use-event";
import { HitorisskeyEvent, hitorisskeyEventTarget } from "../../misc/event";
import { session } from "../../store/session";
import { $t } from "../../text";
import { PostComposerView } from "./post-composer-view";
import { PostView } from "./post-view";
import { LoadingView } from "./primitives/loading-view";

export type ChannelViewProp = {
  channel: string;
};

export const ChannelView: Component<ChannelViewProp> = (p) => {
  const [posts, {mutate, refetch}] = createResource(() => p.channel, ch => api.post.readChannelPostsAsync(ch));
  const [isPageLoading, setPageLoading] = createSignal(false);
  const [refetchTimer, setRefetchTimer] = createSignal(0);
  const [cursor, setCursor] = createSignal<string | undefined>(undefined);
  let paginationTriggerRef: HTMLDivElement | undefined = undefined;

  const paginationObserver = new IntersectionObserver((e) => {
    if (p.channel === 'public') return;
    if (!e[0].isIntersecting) return;
    if (posts.loading) return;
    setPageLoading(true);
    api.post.readChannelPostsAsync(p.channel, cursor()).then((p) => {
      mutate(posts => [...(posts ?? []), ...p]);
      setPageLoading(false);
    });
  }, {
    threshold: 1.0
  });

  const onDeletePost = (e: HitorisskeyEvent<'postDelete'>) => {
    mutate(posts => posts?.filter(p => p.id !== e.detail.id));
  };

  const onUpdatePost = (e: HitorisskeyEvent<'postUpdate'>) => {
    const {id, diff} = e.detail;
    mutate(posts => posts?.map(p => p.id !== id ? p : {...p, ...diff}));
  };

  const onClickRefetchButton = async () => {
    const res = refetch();
    if (res && !Array.isArray(res)) await res;
    setRefetchTimer(5);
    while (refetchTimer() > 0) {
      await new Promise(res => setTimeout(res, 1000));
      setRefetchTimer(p => p - 1);
    }
  };

  const noSuchMessage = createMemo(() => p.channel === 'announce' ? $t.$channelView.noSuchAnnouncements : $t.$channelView.noSuchPosts);
  const isVisibleComposer = createMemo(() => p.channel !== 'announce' || session.user?.role === 'Admin');

  useEvent('postUpdate', onUpdatePost);
  useEvent('postDelete', onDeletePost);

  onMount(() => {
    if (!paginationTriggerRef) return;
    paginationObserver.observe(paginationTriggerRef);
  });

  onCleanup(() => {
    paginationObserver.disconnect();
  });

  createEffect(() => {
    const p = posts();
    if (!p || p.length === 0) return;
    setCursor(p[p.length - 1].id);
  });

  return (
    <>
      <div class="vstack slim">
        <button class="btn link ml-auto" disabled={posts.loading || refetchTimer() > 0} onClick={onClickRefetchButton}>
          <i class="fas fa-rotate fa-fw mr-1" />
          {refetchTimer() > 0 ? refetchTimer() : '更新する'}
        </button>
        <Suspense fallback={<LoadingView />}>
            <For each={posts()} children={item => (
              <PostView post={item} />
            )}/>
            <Show when={posts()?.length === 0}>
              <p class="text-dimmed">{noSuchMessage()}</p>
            </Show>
        </Suspense>
        <div ref={paginationTriggerRef} class="pa-2">
          <Show when={isPageLoading()}><LoadingView /></Show>
        </div>
      </div>
      <Show when={isVisibleComposer()}>
        <PostComposerView channel={p.channel} onCreatePost={(p) => {
          mutate(posts => [p, ...(posts ?? [])]);
        }} />
      </Show>
    </>
  );
};
