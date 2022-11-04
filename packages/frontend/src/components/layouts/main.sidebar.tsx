import { NavLink } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { app } from "../../store/app";
import { clientState } from "../../store/client";
import { $t } from "../../text";

export type MainLayoutSidebarProp = {
  width: number;
};

export const MainLayoutSidebar: Component<MainLayoutSidebarProp> = (p) => {
  const SidebarTitle = styled.h1`
    font-size: 150%;
    color: var(--dimmed);
    margin: 0;
  `;

  return (
    <>
      <SidebarTitle>{$t.hitorisskey}</SidebarTitle>
      <Show when={app.meta?.isClosedBeta}>
        <aside class="text-75 text-dimmed text-right">(Closed BETA)</aside>
      </Show>
      <div class="menu large mt-2">
        <section>
          <h1>{$t.channels}</h1>
          <NavLink href="/c/public" end class="item" activeClass="active">
            <span class="icon i fas fa-home fa-fw"></span>
            {$t.$channels.public}
          </NavLink>
          <NavLink href="/c/private" end class="item" activeClass="active">
            <span class="icon i fas fa-lock fa-fw"></span>
            {$t.$channels.private}
          </NavLink>
          <NavLink href="/c/realtime" end class="item" activeClass="active">
            <span class="icon i fas fa-tower-broadcast fa-fw"></span>
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
          <NavLink href="/c/announce" class="item" activeClass="active">
            <span class="icon i fas fa-bell fa-fw"></span>
            {$t.$channels.announce}
          </NavLink>
          <Show when={clientState.isDebugMode}>
            <NavLink href="/_debug" class="item" activeClass="active">
              <span class="icon i fas fa-wand-sparkles fa-fw"></span>
              Debug
            </NavLink>
          </Show>
          <NavLink href="/about" class="item" activeClass="active">
            <span class="icon i fas fa-info-circle fa-fw"></span>
            {$t.about}
          </NavLink>
          <Show when={app.meta?.isClosedBeta}>
            <NavLink href="/beta/feedback" class="item" activeClass="active">
              <span class="icon i fas fa-laugh fa-fw"></span>
              フィードバック
            </NavLink>
          </Show>
          <NavLink href="/settings" class="item" activeClass="active">
            <span class="icon i fas fa-cog fa-fw"></span>
            {$t.settings}
          </NavLink>
        </section>
      </div>
    </>
  );
};