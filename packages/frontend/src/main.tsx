import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { render, Show } from 'solid-js/web';
import { Router, useLocation, useNavigate, useRoutes } from 'solid-app-router';
import routes from '~solid-pages';
import { MainLayout } from './components/layouts/main';
import { createEffect } from 'solid-js';
import { session } from './store/session';

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
    <Show when={location.pathname !== '/'} fallback={<Routes />}>
      <MainLayout>
        <Routes />
      </MainLayout>
    </Show>
  );
};

render(() => (
  <Router>
    <Inner />
  </Router>
), document.getElementById('app') as HTMLElement);
