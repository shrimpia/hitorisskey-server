import { NavLink } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { styled } from 'solid-styled-components';
import { IS_DEVELOPMENT } from '../../global-const';
import { app } from '../../store/app';
import { clientState } from '../../store/client';
import { isAdminOrModerator } from '../../store/session';
import { $t } from '../../text';

export type MainLayoutSidebarProp = {
  width: number;
};

export const MainLayoutSidebar: Component<MainLayoutSidebarProp> = () => {
  const SidebarTitle = styled.h1`
    font-size: 150%;
    color: var(--dimmed);
    margin: 0;
  `;

  return (
    <>
      <SidebarTitle>
        {$t.hitorisskey}
        <Show when={app.meta?.isClosedBeta}>
          <span class="text-100 ml-1 text-dimmed">(β)</span>
        </Show>
      </SidebarTitle>
      <div class="menu large mt-2">
        <section>
          <h1>{$t.channels}</h1>
          <NavLink href="/c/public" end class="item" activeClass="active">
            <span class="icon i fas fa-home fa-fw" />
            {$t.$channels.public}
          </NavLink>
          <NavLink href="/c/private" end class="item" activeClass="active">
            <span class="icon i fas fa-lock fa-fw" />
            {$t.$channels.private}
          </NavLink>
          <NavLink href="/c/realtime" end class="item" activeClass="active">
            <span class="icon i fas fa-tower-broadcast fa-fw" />
            {$t.$channels.realtime}
          </NavLink>
        </section>
        {/* <section>
          <NavLink href="/bottle-mail" class="item" activeClass="active">
            <span class="icon i fas fa-envelope fa-fw"></span>
            {$t.bottleMail}
          </NavLink>
        </section> */}
        <section>
          <NavLink href="/mypage" class="item" activeClass="active">
            <span class="icon i fas fa-user-circle fa-fw" />
            {$t.mypage}
          </NavLink>
          <NavLink href="/c/announce" class="item" activeClass="active">
            <span class="icon i fas fa-bell fa-fw" />
            {$t.$channels.announce}
          </NavLink>
          <Show when={IS_DEVELOPMENT && clientState.isDebugMode}>
            <NavLink href="/_debug" class="item" activeClass="active">
              <span class="icon i fas fa-wand-sparkles fa-fw" />
              Debug
            </NavLink>
          </Show>
          {/* <NavLink href="/about" class="item" activeClass="active">
            <span class="icon i fas fa-info-circle fa-fw"></span>
            {$t.about}
          </NavLink> */}
          <Show when={app.meta?.isClosedBeta}>
            <NavLink href="/beta/feedback" class="item" activeClass="active">
              <span class="icon i fas fa-laugh fa-fw" />
              フィードバック
            </NavLink>
          </Show>
          <NavLink href="/settings" class="item" activeClass="active">
            <span class="icon i fas fa-cog fa-fw" />
            {$t.settings}
          </NavLink>
        </section>
        <Show when={isAdminOrModerator()}>
          <section>
            <h1>{$t.adminTools}</h1>
            <NavLink href="/admin/settings" class="item" activeClass="active">
              <span class="icon i fas fa-toolbox fa-fw" />
              {$t.$settings.$admin.settings}
            </NavLink>
            <NavLink href="/admin/invitations" class="item" activeClass="active">
              <span class="icon i fas fa-ticket fa-fw" />
              {$t.$settings.$admin.invitations}
            </NavLink>
            <NavLink href="/admin/reports" class="item" activeClass="active">
              <span class="icon i fas fa-flag fa-fw" />
              {$t.$settings.$admin.reports}
            </NavLink>
            <NavLink href="/admin/punishees" class="item" activeClass="active">
              <span class="icon i fas fa-ban fa-fw" />
              {$t.$settings.$admin.punishees}
            </NavLink>
          </section>
        </Show>
      </div>
    </>
  );
};