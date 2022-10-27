import { Component, createSignal, Show } from "solid-js";
import { api } from "../../api";
import { Post } from "../../api/models/post";
import { openMenu } from "../../store/popup-menu";
import { $t } from "../../text";
import { MenuDefinition } from "./menu-view";
import { FormattedTextView } from "./primitives/formatted-text-view";

export type PostProp = {
  post: Post;
};

export const PostView: Component<PostProp> = (p) => {
  const body = () => <div class="pa-2"><FormattedTextView children={p.post.content}/></div>;

  const menu = () => {
    const m: MenuDefinition = [];
    if (p.post.isMine) {
      m.push({
        items: [{
          label: $t.$postView.delete,
          danger: true,
          iconClass: 'fas fa-trash-alt fa-fw',
          onClick() {
            api.post.deleteAsync(p.post.id);
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
        onClick() {
          alert('wip');
        },
      }]
    })
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