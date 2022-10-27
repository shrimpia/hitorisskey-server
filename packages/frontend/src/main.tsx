import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './global.scss';

import { render, Show } from 'solid-js/web';
import { Router, useLocation, useNavigate, useRoutes } from 'solid-app-router';
import routes from '~solid-pages';
import { MainLayout } from './components/layouts/main';
import { createEffect } from 'solid-js';
import { session } from './store/session';
import { getAppRef } from './misc/ref';
import { PopupView } from './components/views/popup-view';
import { closeMenu, popupMenuState } from './store/popup-menu';
import { MenuView } from './components/views/menu-view';

const Inner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const Routes = useRoutes(routes);

  createEffect(() => {
    if (location.pathname !== '/' && !session.token) {
      navigate('/');
    }
  });

  return (
    <>
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
