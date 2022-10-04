import { NavLink } from "solid-app-router";
import { ParentComponent } from "solid-js";
import { clientState } from "../../store/client";

import './main.scss';

export type MainLayoutProp = {
};

export const MainLayout: ParentComponent<MainLayoutProp> = (p) => {

  return (
    <div class="layout-main">
      <div class="hs-sidebar">
        <h1 class="hs-sidebar-title">ひとりすきー</h1>
        <div class="menu large mt-2">
          <section>
            <h1>チャンネル</h1>
            <NavLink href="/c/public" end class="item" activeClass="active">
              <span class="icon i fas fa-home fa-fw"></span>
              みんなのつぶやき
            </NavLink>
            <NavLink href="/c/private" end class="item" activeClass="active">
              <span class="icon i fas fa-lock fa-fw"></span>
              プライベートルーム
            </NavLink>
            <NavLink href="/c/realtime" end class="item" activeClass="active">
              <span class="icon i fas fa-comment-dots fa-fw"></span>
              なう！広場
            </NavLink>
          </section>
          <section>
            <NavLink href="/announcements" class="item" activeClass="active">
              <span class="icon i fas fa-bell fa-fw"></span>
              お知らせ
            </NavLink>
            <NavLink href="/bottle-mail" class="item" activeClass="active">
              <span class="icon i fas fa-envelope fa-fw"></span>
              ボトルメール
            </NavLink>
            <NavLink href="/settings" class="item" activeClass="active">
              <span class="icon i fas fa-cog fa-fw"></span>
              設定
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
        <div class="container">
          {p.children}
        </div>
      </div>
    </div>
  );
};