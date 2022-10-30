import { Link } from "solid-app-router";
import { Component, Show } from "solid-js";
import { styled } from "solid-styled-components";

import { useTitle } from "../../hooks/use-title";
import { session, setSession } from "../../store/session";
import { $t } from "../../text";

const Settings: Component = () => {
  useTitle($t.settings);

  const Menu = styled.div`
    max-width: 1024px;
    margin: 0 auto;
  `;

  const logout = () => {
    if (confirm('ログアウトしますか？')) {
      setSession({token: null});
    }
  };

  return (
    <Menu class="list-form">
      <Link class="item" href="/settings/display">
        <i class="icon fas fa-palette" />
        <div class="body">
          <h1>{$t.$settings.display}</h1>
          <p class="desc">{$t.$settings.displayDescription}</p>
        </div>
      </Link>
      <Link class="item" href="/settings/account">
        <i class="icon fas fa-circle-user" />
        <div class="body">
          <h1>{$t.$settings.account}</h1>
          <p class="desc">{$t.$settings.accountDescription}</p>
        </div>
      </Link>
      <Link class="item" href="/settings/privacy">
        <i class="icon fas fa-lock" />
        <div class="body">
          <h1>{$t.$settings.privacy}</h1>
          <p class="desc">{$t.$settings.privacyDescription}</p>
        </div>
      </Link>
      <button class="item" disabled={session.user?.email === null} onClick={logout}>
        <i class="icon fas fa-right-from-bracket" />
        <div class="body">
          <h1>{$t.$settings.logout}</h1>
          <Show when={session.user?.email === null}>
            <p class="desc">{$t.$settings.logoutDisabled}</p>
          </Show>
        </div>
      </button>
    </Menu>
  );
};

export default Settings;
