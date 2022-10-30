import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { api } from '../api';
import { User } from '../api/models/user';

const [session, setSession] = createStore({
  token: localStorage.getItem('token'),
  user: null as User | null,
});

export const refetchUser = async () => {
  try {
    const user = await api.session.readAsync();
    setSession({ user });
  } catch (e) {
    if (e instanceof Error && e.message === 'INVALID_TOKEN') {
      setSession({ token: null });
    }
  }
};

// ユーザーを取得
createEffect(() => {
  if (session.token) {
    refetchUser();
    localStorage.setItem('token', session.token);
  } else {
    localStorage.removeItem('token');
  }
});

export {
  session,
  setSession,
};
