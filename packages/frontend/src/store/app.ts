import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { api } from '../api';
import { AppMeta } from '../api/models/app-meta';

const [app, setApp] = createStore({
  meta: null as AppMeta | null,
});

// ユーザーを取得
createEffect(() => {
  api.app.readMetaAsync().then(meta => setApp({meta}));
});

export {
  app,
  setApp,
};
