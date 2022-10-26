import { createStore } from "solid-js/store";

const [clientState, updateClientState] = createStore({
  title: '',
  lastChannel: 'public',
});

export {
  clientState,
  updateClientState,
};
