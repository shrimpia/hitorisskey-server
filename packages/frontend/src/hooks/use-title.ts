import { Accessor, createEffect } from "solid-js";
import { TitleProp, updateClientState } from "../store/client";

export const useTitle = (title: TitleProp | Accessor<TitleProp>) => {
  createEffect(() => {
    updateClientState({ title: typeof title === 'function' ? title() : title });
  });
};