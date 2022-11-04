import { Component } from "solid-js";
import { Post } from "../../api/models/post";
import { PostView } from "../../components/views/PostView";
import { useTitle } from "../../hooks/use-title";

const DebugNote: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'PostView']);

  const p: Post = {
    id: 'abcdefg',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic, necessitatibus nemo facilis rem quas sunt nesciunt iure ad? Error incidunt atque sequi ipsum laborum mollitia vitae nemo iste ea.',
    channel: 'public',
    annotation: null,
    isMine: false,
    reactions: [],
  };

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
