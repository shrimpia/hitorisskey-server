import { createEffect, ErrorBoundary } from 'solid-js';
import { createGlobalStyles } from 'solid-styled-components';
import { render, Show } from 'solid-js/web';
import { Router, useLocation, useNavigate, useRoutes } from '@solidjs/router';

import { MainLayout } from './components/layouts/main';
import { refetchUser, session } from './store/session';
import { getAppRef } from './misc/ref';
import { PopupView } from './components/views/popup-view';
import { closeMenu, popupMenuState } from './store/popup-menu';
import { MenuView } from './components/views/menu-view';
import { clientState, updateMobile } from './store/client';
import { useTheme } from './hooks/use-theme';
import { app } from './store/app';
import { LoadingView } from './components/views/primitives/loading-view';

import routes from '~solid-pages';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './global.scss';
import { useWindowEvent } from './hooks/use-event';

const GlobalStyle = createGlobalStyles`
  html {
    font-size: ${props => props.fontSize}px;
  }

  body {
    --primary: var(--${props => props.accentColor});
    --primary-1: var(--${props => props.accentColor}-1);
    --primary-2: var(--${props => props.accentColor}-2);
    --primary-3: var(--${props => props.accentColor}-3);
    --primary-4: var(--${props => props.accentColor}-4);
    --primary-5: var(--${props => props.accentColor}-5);
    --primary-6: var(--${props => props.accentColor}-6);
    --primary-7: var(--${props => props.accentColor}-7);
    --primary-8: var(--${props => props.accentColor}-8);
    --primary-9: var(--${props => props.accentColor}-9);
    --primary-10: var(--${props => props.accentColor}-10);
  }
`;

const Inner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const Routes = useRoutes(routes);

  createEffect(() => {
    if (location.pathname !== '/' && !session.token) {
      navigate('/');
    }
  });


  // ユーザーを取得
  createEffect(() => {
    if (session.token) {
      refetchUser();
      localStorage.setItem('token', session.token);
    } else {
      localStorage.removeItem('token');
    }
  });

  const onResize = () => {
    updateMobile();
  };

  useWindowEvent('resize', onResize);

  useTheme();

  const _Routes = () => (
    <ErrorBoundary fallback={(e: Error, reset) => (
      <>
        <h2>エラーが発生しました。</h2>
        <p>技術情報: <b>{e.name}</b> ({e.message})</p>
        <button class="btn primary" onClick={reset}>再読み込み</button>
      </>
    )}>
      <Routes />
    </ErrorBoundary>
  );

  return (
    <Show when={app.meta} fallback={<LoadingView />}>
      <GlobalStyle fontSize={clientState.fontSize} accentColor={clientState.accentColor} />
      <Show when={location.pathname !== '/'} fallback={<_Routes />}>
        <MainLayout>
          <_Routes />
        </MainLayout>
      </Show>
      <PopupView show={popupMenuState.show} x={popupMenuState.x} y={popupMenuState.y} onClose={() => closeMenu()}>
        <div class="pa-1">
          <MenuView items={popupMenuState.items ?? []} onClick={() => closeMenu()} />
        </div>
      </PopupView>
    </Show>
  );
};

render(() => (
  <Router>
    <Inner />
  </Router>
), getAppRef());
