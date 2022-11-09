import { onCleanup, onMount } from 'solid-js';
import { HitorisskeyEvent, HitorisskeyEventMap, hitorisskeyEventTarget } from '../misc/event';

export const useEvent = <T extends keyof HitorisskeyEventMap>(key: T, event: (e: HitorisskeyEvent<T>) => void) => {
  onMount(() => {
    hitorisskeyEventTarget.addEventListener(key, event);
  });

  onCleanup(() => {
    hitorisskeyEventTarget.removeEventListener(key, event);
  });
};

export const useWindowEvent = <T extends keyof WindowEventMap>(key: T, event: (e: WindowEventMap[T]) => void) => {
  onMount(() => {
    window.addEventListener(key, event);
  });

  onCleanup(() => {
    window.removeEventListener(key, event);
  });
};
