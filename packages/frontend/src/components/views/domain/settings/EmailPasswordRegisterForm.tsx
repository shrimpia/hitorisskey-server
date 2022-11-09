import { Component, createMemo, createSignal, Show } from 'solid-js';
import { api } from '../../../../api';
import { model } from '../../../../directives/model';
import { isNotEmpty, isNotEmptyAll } from '../../../../misc/is-not-empty';
import { refetchUser } from '../../../../store/session';
import { $t } from '../../../../text';

// やらないとmodelがtree-shakingされてしまい、ディレクティブが動かない
0 && model;

export const EmailPasswordRegisterForm: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordConfimation, setPasswordConfimation] = createSignal('');
  const [isRegistering, setRegistering] = createSignal(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = createSignal<string | null>(null);
  const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = createSignal<string | null>(null);
  
  const canRegister = createMemo(() => isNotEmptyAll(email(), password(), passwordConfimation()) && password().length >= 8 && password() === passwordConfimation());

  const validatePassword = () => {
    if (!password()) {
      setPasswordErrorMessage('パスワードを入力してください。');
    } else if (password().length < 8) {
      setPasswordErrorMessage('パスワードは8文字以上で入力してください。');
    } else {
      setPasswordErrorMessage('');
    }

    if (isNotEmpty(passwordConfimation())) {
      validatePasswordConfirmation();
    }
  };

  const validatePasswordConfirmation = () => {
    if (!passwordConfimation()) {
      setPasswordConfirmationErrorMessage('パスワードを入力してください。');
    } else if (password() !== passwordConfimation()) {
      setPasswordConfirmationErrorMessage('パスワードが一致しません。');
    } else {
      setPasswordConfirmationErrorMessage('');
    }
  };

  const register = async () => {
    setRegistering(true);
    try {
      await api.session.signupAsync(email(), password());
      await refetchUser();
      alert('登録が完了しました！');
    } catch (e) {
      alert((e as Error).message ?? e);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <form class="card pa-2">
      <h2>{$t.$settings.$account.emailSettings}</h2>
      <p class="text-dimmed">
        {$t.$settings.$account.emailSettingsDescription}
      </p>
      <label class="input-field">
        {$t.email}
        <input type="email" autocomplete="email" use:model={[email, setEmail]} disabled={isRegistering()} />
      </label>
      <label class="input-field">
        {$t.password}
        <input type="password" autocomplete="new-password" use:model={[password, setPassword]} disabled={isRegistering()} onInput={() => validatePassword()} />
        <Show when={passwordErrorMessage()}><span class="text-red">{passwordErrorMessage()}</span></Show>
      </label>
      <label class="input-field">
        {$t.passwordConfirmation}
        <input type="password" autocomplete="new-password" use:model={[passwordConfimation, setPasswordConfimation]} disabled={isRegistering()} onInput={() => validatePasswordConfirmation()} />
        <Show when={passwordConfirmationErrorMessage()}><span class="text-red">{passwordConfirmationErrorMessage()}</span></Show>
      </label>
      <button type="button" class="btn primary mt-2" disabled={!canRegister() || isRegistering()} onClick={register}>{$t.register}</button>
    </form>
  );
};