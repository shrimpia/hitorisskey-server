import { createEffect } from 'solid-js';
import { createGlobalStyles } from 'solid-styled-components';
import { render, Show } from 'solid-js/web';
import { Router, useLocation, useNavigate, useRoutes } from 'solid-app-router';

import { MainLayout } from './components/layouts/main';
import { session } from './store/session';
import { getAppRef } from './misc/ref';
import { PopupView } from './components/views/popup-view';
import { closeMenu, popupMenuState } from './store/popup-menu';
import { MenuView } from './components/views/menu-view';

import routes from '~solid-pages';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './global.scss';
import { clientState } from './store/client';
import { useTheme } from './hooks/use-theme';


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
  
  useTheme();

  return (
    <>
      <GlobalStyle fontSize={clientState.fontSize} accentColor={clientState.accentColor} />
      <Show when={location.pathname !== '/'} fallback={<Routes />}>
        <MainLayout>
          <Routes />
        </MainLayout>
      </Show>
      <PopupView show={popupMenuState.show} x={popupMenuState.x} y={popupMenuState.y} onClose={() => closeMenu()}>
        <div class="pa-1">
          <MenuView items={popupMenuState.items ?? []} onClick={() => closeMenu()} />
        </div>
      </PopupView>
    </>
  );
};

render(() => (
  <Router>
    <Inner />
  </Router>
), getAppRef());
