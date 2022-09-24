import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';
import {
  RecoilRoot,
} from 'recoil';
import routes from '~react-pages';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    </RecoilRoot>
  )
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);
