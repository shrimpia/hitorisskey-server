import { Component, createResource, For, Show, Suspense } from "solid-js";
import { styled } from "solid-styled-components";

import { api } from "../../api";
import { Invitation } from "../../api/models/invitation";
import { LoadingView } from "../../components/views/primitives/LoadingView";
import { useTitle } from "../../hooks/use-title";
import { $t } from "../../text";

const AdminInvitations: Component = () => {
  const [list, {mutate}] = createResource(() => api.invitations.listAsync());
  useTitle($t.$settings.$admin.invitations);

  const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--margin);
  `;

  const Card = styled.div`
    transform-origin: center center;
    transform: rotate(1deg);

    &.used {
      filter: brightness(0.8);
    }
  `;

  const generate = () => {
    api.invitations.generateAsync().then(i => mutate(() => i));
  };

  const revoke = (invitation: Invitation) => {
    if (!invitation.is_used && !confirm('招待コードを本当に削除しますか？')) return;
    api.invitations.revokeAsync(invitation.code).then(i => mutate(() => i));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <button class="btn primary mb-3" onClick={generate}>
        <i class="fas fa-plus fa-fw" /> 新規発行
      </button>
      <CardList>
        <For each={list()} children={invitation => (
          <Card class="card shadow-1" classList={{used: invitation.is_used}}>
            <div class="body">
              <h1>{invitation.code}</h1>
              <p classList={{'text-green': !invitation.is_used, 'text-red': invitation.is_used}}>
                ●{invitation.is_used ? '使用済み' : '招待中'}
              </p>
              <button class="btn danger mt-1 ml-auto block" onClick={() => revoke(invitation)}>
                取り消し
              </button>
            </div>
          </Card>
        )} />
      </CardList>
      <Show when={list()?.length === 0}>
        <p class="text-dimmed">招待コードはまだ発行されていません。</p>
      </Show>
    </Suspense>
  );
};

export default AdminInvitations;
