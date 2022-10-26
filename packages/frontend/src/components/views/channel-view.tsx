import { Component, createResource, For, Suspense } from "solid-js";
import { styled } from "solid-styled-components";
import { api } from "../../api";
import { PostComposerView } from "./post-composer-view";
import { PostView } from "./post-view";
import { LoadingView } from "./primitives/loading-view";

export type ChannelViewProp = {
  channel: string;
};

export const ChannelView: Component<ChannelViewProp> = (p) => {
  const [posts, {refetch}] = createResource(() => p.channel, ch => api.post.readChannelPostsAsync(ch));
  
  return (
    <>
      <div class="vstack slim">
        <Suspense fallback={<LoadingView />}>
            <For each={posts()} children={item => (
              <PostView post={item} />
            )}/>
        </Suspense>
      </div>
      <PostComposerView channel={p.channel} onCreatePost={() => refetch()} />
    </>
  );
};
