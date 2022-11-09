import { createStore } from 'solid-js/store';
import { api } from '../api';
import { User } from '../api/models/user';

const [session, setSession] = createStore({
  token: localStorage.getItem('token'),
  user: null as User | null,
});

export const isAdmin = () => session.user?.role === 'Admin';

export const isModerator = () => session.user?.role === 'Admin';

export const isAdminOrModerator = () => isAdmin() || isModerator();

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

export {
  session,
  setSession,
};
