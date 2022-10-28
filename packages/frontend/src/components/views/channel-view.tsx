import { Component, createEffect, createResource, createSignal, For, onCleanup, onMount, Show, Suspense } from "solid-js";

import { api } from "../../api";
import { PostComposerView } from "./post-composer-view";
import { PostView } from "./post-view";
import { LoadingView } from "./primitives/loading-view";

export type ChannelViewProp = {
  channel: string;
};

export const ChannelView: Component<ChannelViewProp> = (p) => {
  const [posts, {mutate}] = createResource(() => p.channel, ch => api.post.readChannelPostsAsync(ch));
  const [isPageLoading, setPageLoading] = createSignal(false);
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

  onMount(() => {
    if (!paginationTriggerRef) return;
    paginationObserver.observe(paginationTriggerRef);
  });

  onCleanup(() => {
    paginationObserver.disconnect();
  });

  createEffect(() => {
    const p = posts();
    if (!p) return;
    setCursor(p[p.length - 1].id);
  });
  
  return (
    <>
      <div class="vstack slim">
        <Suspense fallback={<LoadingView />}>
            <For each={posts()} children={item => (
              <PostView post={item} />
            )}/>
        </Suspense>
        <div ref={paginationTriggerRef} class="pa-2">
          <Show when={isPageLoading()}><LoadingView /></Show>
        </div>
      </div>
      <PostComposerView channel={p.channel} onCreatePost={(p) => {
        mutate(posts => [p, ...(posts ?? [])]);
      }} />
    </>
  );
};
