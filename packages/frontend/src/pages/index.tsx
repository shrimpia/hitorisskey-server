import { Component, createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { api } from "../api";
import { session, setSession } from "../store/session";
import { clientState } from "../store/client";
import { $t } from "../text";

import './index.scss';

type WelcomeState = 'initial' | 'createNew' | 'loginForm';

const Index: Component = () => {
  const [state, setState] = createSignal<WelcomeState>('initial');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();

  createEffect(() => {
    if (session.token) {
      navigate(`/c/${clientState.lastChannel}`);
    }
  });

  const startNew = () => api.session.startAsync().then((res) => {
    setSession({
      token: res.token,
    });
  });

  const login = () => api.session.loginAsync(email(), password()).then(res => {
    setSession({
      token: res.token,
    });
  }).catch((e) => {
    if (e instanceof Error && e.message === 'NOT_FOUND') {
      alert('ログインに失敗しました。メールアドレスおよびパスワードが正しいかお確かめの上、再試行してください。');
    } else {
      alert('通信エラーです。もう一度お試しください。');
    }
  });

  return (
    <div class="template-index-welcome">
      <div class="inner pa-2">
        <h1>{$t.hitorisskey}</h1>
        <p class="text-dimmed mb-5">{$t.$welcome.subTitle}</p>
        <Switch>
          <Match when={state() === 'initial'}>
            <div class="hstack wrap">
              <button class="btn primary" onClick={() => setState('createNew')}>{$t.$welcome.createNew}</button>
              <button class="btn primary outline" onClick={() => setState('loginForm')}>{$t.$welcome.login}</button>
            </div>
          </Match>
          <Match when={state() === 'createNew'}>
            <p>
              <strong class="text-red">{$t.$welcome.$createNew.title}</strong>
            </p>
            <p>{$t.$welcome.$createNew.description}</p>
            <div class="hstack mt-2">
              <button class="btn primary" onClick={startNew}>{$t.$welcome.$createNew.ok}</button>
              <button class="btn primary outline" onClick={() => setState('initial')}>{$t.$welcome.$createNew.cancel}</button>
            </div>
          </Match>
          <Match when={state() === 'loginForm'}>
            <h2>
              {$t.$welcome.login}
            </h2>
            <p>{$t.$welcome.$login.description1}</p>
            <p>{$t.$welcome.$login.description2}</p>
            <div class="mt-2 card pa-2">
              <label class="input-field">
                {$t.email}
                <input type="email" value={email()} onInput={e => setEmail(e.currentTarget.value)} />
              </label>
              <label class="input-field">
                {$t.password}
                <input type="password" value={password()} onInput={e => setPassword(e.currentTarget.value)} />
              </label>
              <button class="btn primary mt-4 text-center ml-auto" onClick={login}>{$t.$welcome.$login.ok}</button>
            </div>            
            <button class="btn outline primary mt-2" onClick={() => setState('initial')}>{$t.$welcome.$login.cancel}</button>
          </Match>
        </Switch>
        <aside class="text-dimmed text-75 mt-5">
          (C)2022 Xeltica Studio
        </aside>
      </div>
    </div>
  );
}

export default Index;
