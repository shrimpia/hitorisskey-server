import { Component, createSignal, Show } from "solid-js";
import { Post } from "../../api/models/post";
import { FormattedTextView } from "./primitives/formatted-text-view";

export type PostProp = {
  post: Post;
};

export const PostView: Component<PostProp> = ({post}) => {
  const body = <FormattedTextView children={post.content}/>;
  return (
    <div class="card hs-post">
      <div class="body">
        <Show when={post.annotation} fallback={body}>
          <details>
            <summary><FormattedTextView inline children={post.annotation} /></summary>
            {body}
          </details>
        </Show>
        <div class="hstack mt-2">
          <button class="btn flat">
            <i class="far fa-face-smile"></i>
          </button>
          <button class="btn flat">
            <i class="fas fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};