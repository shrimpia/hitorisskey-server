import { NavLink } from "solid-app-router";
import { ParentComponent } from "solid-js";
import { clientState } from "../../store/client";
import { $t } from "../../text";

import './main.scss';

export type MainLayoutProp = {

};

export const MainLayout: ParentComponent<MainLayoutProp> = (p) => {
  return (
    <div class="layout-main">
      <div class="hs-sidebar">
        <h1 class="hs-sidebar-title">{$t.hitorisskey}</h1>
        <aside class="text-75 text-dimmed text-right">(Closed BETA)</aside>
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
              <span class="icon i fas fa-comment-dots fa-fw"></span>
              {$t.$channels.realtime}
            </NavLink>
          </section>
          <section>
            <NavLink href="/bottle-mail" class="item" activeClass="active">
              <span class="icon i fas fa-envelope fa-fw"></span>
              {$t.bottleMail}
            </NavLink>
            <NavLink href="/announcements" class="item" activeClass="active">
              <span class="icon i fas fa-bell fa-fw"></span>
              {$t.announcements}
            </NavLink>
            <NavLink href="/about" class="item" activeClass="active">
              <span class="icon i fas fa-info-circle fa-fw"></span>
              {$t.about}
            </NavLink>
            <NavLink href="/settings" class="item" activeClass="active">
              <span class="icon i fas fa-cog fa-fw"></span>
              {$t.settings}
            </NavLink>
          </section>
        </div>
      </div>
      <div class="hs-main">
        <div class="hs-titlebar">
          <div class="hs-titlebar-title-container">
            <h1 class="hs-titlebar-title">
              {clientState.title}
            </h1>
          </div>
        </div>
        <div class="container hs-container">
          {p.children}
        </div>
      </div>
    </div>
  );
};