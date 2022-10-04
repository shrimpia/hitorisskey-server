import { useNavigate } from "solid-app-router";
import { Component, createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { api } from "../api";
import { session, setSession } from "../store/session";
import { clientState } from "../store/client";

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
    localStorage.setItem('token', res.token);
    setSession({
      token: res.token,
    });
  });

  return (
    <div class="template-index-welcome">
      <div class="inner pa-2">
        <h1>ひとりすきー</h1>
        <p class="text-dimmed mb-5">なにかをつぶやきたい。けど、素性は知られたくない。</p>
        <Switch>
          <Match when={state() === 'initial'}>
            <div class="hstack wrap">
              <button class="btn primary" onClick={() => setState('createNew')}>新しくはじめる</button>
              <button class="btn primary outline" onClick={() => setState('loginForm')}>ログイン</button>
            </div>
          </Match>
          <Match when={state() === 'createNew'}>
            <p>
              <strong class="text-red">注意！ひとりすきーを使うのははじめてですか？</strong>
            </p>
            <p>
              すでに他の端末でひとりすきーをご利用の場合、メールアドレスとパスワードを登録していれば、
              そのアカウントを引き続きこの端末でご利用いただけます。
            </p>
            <div class="hstack mt-2">
              <button class="btn primary" onClick={startNew}>それでも新規作成する</button>
              <button class="btn outline primary" onClick={() => setState('initial')}>やっぱり戻る</button>
            </div>
          </Match>
          <Match when={state() === 'loginForm'}>
            <h2>
              ログイン
            </h2>
            <p>以前使用していたアカウントのメールアドレスとパスワードを入力してください。</p>
            <p>メールアドレスとパスワードをまだ登録していないのであれば、以前の端末にてひとりすきーにアクセスし、設定画面から登録してください。</p>
            <div class="mt-2 card pa-2">
              <label class="input-field">
                メールアドレス
                <input type="email" value={email()} onInput={e => setEmail(e.currentTarget.value)} />
              </label>
              <label class="input-field">
                パスワード
                <input type="password" value={password()} onInput={e => setPassword(e.currentTarget.value)} />
              </label>
              <button class="btn primary mt-4 text-center ml-auto">ログイン</button>
            </div>            
            <button class="btn outline primary mt-2" onClick={() => setState('initial')}>やっぱり戻る</button>
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
