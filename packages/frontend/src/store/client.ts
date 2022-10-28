import { createStore } from "solid-js/store";

export type TitleObject = {
  link?: string;
  label: string;
};

export type TitleProp = string | TitleObject | Array<string | TitleObject>;

const [clientState, updateClientState] = createStore({
  title: '' as TitleProp,
  fullView: false,
  lastChannel: 'public',
});

export {
  clientState,
  updateClientState,
};
