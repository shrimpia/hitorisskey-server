import { Component, createEffect, createSignal, Match, Show, Switch } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { api } from '../api';
import { session, setSession } from '../store/session';
import { clientState } from '../store/client';
import { $t } from '../text';
import { styled } from 'solid-styled-components';
import { app } from '../store/app';
import { model } from '../directives/model';

0 && model;

type WelcomeState =
  | 'initial'
  | 'createNew'
  | 'loginForm'
  | 'invitation'
  ;

const Index: Component = () => {
  const [state, setState] = createSignal<WelcomeState>('initial');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [code, setCode] = createSignal('');

  const navigate = useNavigate();

  createEffect(() => {
    if (session.token) {
      navigate(`/c/${clientState.lastChannel}`);
    }
  });

  const startNew = () => {
    if (app.meta?.isClosedBeta) {
      setState('invitation');
    } else {
      api.session.startAsync().then((res) => {
        setSession({
          token: res.token,
        });
      });
    }
  };

  const startNewCode = () => {
    api.session.startAsync(code()).then((res) => {
      setSession({
        token: res.token,
      });
    });
  };

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

  const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  `;

  const Inner = styled.div`
    max-width: 800px;
    width: 100%;
  `;

  return (
    <Root>
      <Inner class="pa-2">
        <h1>
          {$t.hitorisskey}
          <Show when={app.meta?.isClosedBeta}>
            <span class="text-dimmed ml-1 text-125">(β)</span>
          </Show>
        </h1>
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
                <input type="email" use:model={[email, setEmail]} />
              </label>
              <label class="input-field">
                {$t.password}
                <input type="password" use:model={[password, setPassword]} />
              </label>
              <button class="btn primary mt-4 text-center ml-auto" onClick={login}>{$t.$welcome.$login.ok}</button>
            </div>
            <button class="btn outline primary mt-2" onClick={() => setState('initial')}>{$t.$welcome.$login.cancel}</button>
          </Match>
          <Match when={state() === 'invitation'}>
            <p>招待コードを入力してください。</p>
            <input type="password" class="input-field" autocomplete="off" use:model={[code, setCode]} />
            <div class="hstack mt-2">
              <button class="btn primary text-center ml-auto" onClick={startNewCode}>新規作成</button>
              <button class="btn outline primary" onClick={() => setState('initial')}>{$t.$welcome.$login.cancel}</button>
            </div>
          </Match>
        </Switch>
        <aside class="text-dimmed text-75 mt-5">
          (C)2022 Xeltica Studio
        </aside>
      </Inner>
    </Root>
  );
};

export default Index;
