import { onCleanup, onMount } from 'solid-js';
import { updateClientState } from '../store/client';

export const useFullView = () => {
  onMount(() => {
    updateClientState({ fullView: true });
  });

  onCleanup(() => {
    updateClientState({ fullView: false });
  });
};