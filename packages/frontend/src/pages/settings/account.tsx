import { Component, createMemo, Show } from 'solid-js';
import { EmailPasswordRegisterForm } from '../../components/views/domain/settings/EmailPasswordRegisterForm';

import { useTitle } from '../../hooks/use-title';
import { session } from '../../store/session';
import { $t } from '../../text';

const SettingsAccount: Component = () => {
  useTitle([{
    label: $t.settings,
    link: '/settings',
  }, $t.$settings.account]);

  const isRequiredEmailPassword = createMemo(() => session.user !== null && session.user.email === null);

  return (
    <div class="vstack">
      <Show when={isRequiredEmailPassword()}>
        <EmailPasswordRegisterForm />
      </Show>
      <Show when={!isRequiredEmailPassword()}>
        <div class="card pa-2">
          <h2>{$t.$settings.$account.emailSettings}</h2>
          <p class="text-dimmed mb-1">{$t.$settings.$account.emailAlreadyRegistered}</p>
          <label class="input-field">
            {$t.email}
            <input type="email" disabled value={session.user?.email ?? ''} />
          </label>
          <div class="alert mt-2 bg-info">
            メールアドレスおよびパスワードの再設定機能は、現在開発中です。
          </div>
        </div>
      </Show>
      {/* <div class="card pa-2">
        <h2>二要素認証</h2>
        <div class="alert bg-danger">
          <i class="icon fas fa-exclamation-circle"></i>
          メールアドレスとパスワードを認証していないため、二要素認証を設定できません。
        </div>
      </div> */}
    </div>
  );
};

export default SettingsAccount;
