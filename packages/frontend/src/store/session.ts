import { createStore } from 'solid-js/store';

const [session, setSession] = createStore({
  token: localStorage.getItem('token'),
});

export {
  session,
  setSession,
};
