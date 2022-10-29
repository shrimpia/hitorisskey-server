import { createEffect, onCleanup, onMount } from "solid-js";
import { TitleProp, updateClientState } from "../store/client";

export const useTitle = (title: TitleProp) => {
  createEffect(() => {
    updateClientState({ title });
  });
};