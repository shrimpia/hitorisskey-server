import 'xeltica-ui/dist/css/xeltica-ui.min.css';

import { render } from 'solid-js/web';
import { Router, useRoutes } from 'solid-app-router';
import routes from '~solid-pages';

render(
  () => {
    const Routes = useRoutes(routes);
    return (
      <Router>
        <Routes />
      </Router>
    );
  },
  document.getElementById('app') as HTMLElement,
);
