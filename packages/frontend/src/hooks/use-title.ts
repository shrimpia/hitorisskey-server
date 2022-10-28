import { onCleanup, onMount } from "solid-js";
import { TitleProp, updateClientState } from "../store/client";

export const useTitle = (title: TitleProp) => {
  onMount(() => {
    updateClientState({ title });
  });

  onCleanup(() => {
    updateClientState({ title: '' });
  });
};