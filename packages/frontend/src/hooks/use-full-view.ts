import { onCleanup, onMount } from "solid-js";
import { TitleProp, updateClientState } from "../store/client";

export const useFullView = () => {
  onMount(() => {
    updateClientState({ fullView: true });
  });

  onCleanup(() => {
    updateClientState({ fullView: false });
  });
};