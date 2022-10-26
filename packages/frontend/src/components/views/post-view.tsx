import { Component, createSignal, Show } from "solid-js";
import { Post } from "../../api/models/post";
import { openMenu } from "../../store/popup-menu";
import { MenuDefinition } from "./menu-view";
import { FormattedTextView } from "./primitives/formatted-text-view";

export type PostProp = {
  post: Post;
};

export const PostView: Component<PostProp> = (p) => {
  const body = () => <FormattedTextView children={p.post.content}/>;

  const menu = () => {
    const m: MenuDefinition = [];
    if (p.post.isMine) {
      m.push({
        label: '削除',
        danger: true,
        iconClass: 'fas fa-trash-alt fa-fw',
      });
    }
    return m;
  }; 

  const onClickMore = (e: MouseEvent) => {
    openMenu(menu(), e.currentTarget as HTMLElement);
  };

  return (
    <div class="card hs-post">
      <div class="body">
        <Show when={p.post.annotation} fallback={body()}>
          <details>
            <summary><FormattedTextView inline children={p.post.annotation} /></summary>
            {body()}
          </details>
        </Show>
        <div class="hstack mt-2">
          <button class="btn flat">
            <i class="far fa-face-smile"></i>
          </button>
          <button class="btn flat" onClick={onClickMore}>
            <i class="fas fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};