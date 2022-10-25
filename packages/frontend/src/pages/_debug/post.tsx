import { Component, createEffect, onMount } from "solid-js";
import { Post } from "../../api/models/post";
import { PostView } from "../../components/views/post-view";
import { updateClientState } from "../../store/client";

const DebugNote: Component = () => {
  const p: Post = {
    id: 'abcdefg',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic, necessitatibus nemo facilis rem quas sunt nesciunt iure ad? Error incidunt atque sequi ipsum laborum mollitia vitae nemo iste ea.',
    channel: 'public',
    annotation: null,
  };

  createEffect(() => {
    updateClientState({ title: 'Debug :: PostView' });
  });

  return (
    <div class="vgroup">
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
      <PostView post={p}/>
    </div>
  );
};

export default DebugNote;
