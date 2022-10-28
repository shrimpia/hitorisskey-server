import { Link } from "solid-app-router";
import { Component, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { MainLayout } from "../components/layouts/main";
import { updateClientState } from "../store/client";
import { $t } from "../text";

const Settings: Component = () => {
  onMount(() => {
    updateClientState({title: $t.settings});
  });
  const Menu = styled.div`
    max-width: 1024px;
    margin: 0 auto;
  `;
  return (
    <Menu class="list-form">
      <Link class="item" href="/settings/display">
        <i class="icon fas fa-palette" />
        <div class="body">
          <h1>表示設定</h1>
          <p class="desc">テーマ、アクセントカラー、文字サイズ</p>
        </div>
      </Link>
      <Link class="item" href="/settings/accounts">
        <i class="icon fas fa-circle-user" />
        <div class="body">
          <h1>アカウント設定</h1>
          <p class="desc">メールアドレス、二要素認証</p>
        </div>
      </Link>
      <Link class="item" href="/settings/privacy">
        <i class="icon fas fa-lock" />
        <div class="body">
          <h1>プライバシー設定</h1>
          <p class="desc">ワードミュート</p>
        </div>
      </Link>
      <button class="item text-danger" disabled>
        <i class="icon fas fa-right-from-bracket" />
        <div class="body">
          <h1>ログアウト</h1>
          <p class="desc">アカウントにメールアドレスを登録していないため、ログアウトできません。</p>
        </div>
      </button>
    </Menu>
  );
};

export default Settings;
