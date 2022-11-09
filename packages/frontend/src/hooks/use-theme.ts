import { createEffect, createSignal } from 'solid-js';
import { clientState } from '../store/client';

export const actualThemes = [
  'light',
  'dark',
] as const;

export const themes = [
  ...actualThemes,
  'system',
] as const;

export type Theme = typeof themes[number];

export type ActualTheme = typeof actualThemes[number];

export const useTheme = () => {
  const [ osTheme, setOsTheme ] = createSignal<ActualTheme>('dark');

  const applyTheme = () => {
    const actualTheme = clientState.theme === 'system' ? osTheme() : clientState.theme;
    if (actualTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // テーマ変更に追従する
  createEffect(applyTheme);

  // システムテーマ変更に追従する
  createEffect(() => {
    const q = window.matchMedia('(prefers-color-scheme: dark)');
    setOsTheme(q.matches ? 'dark' : 'light');

    const listener = () => setOsTheme(q.matches ? 'dark' : 'light');
    q.addEventListener('change', listener);
    return () => {
      q.removeEventListener('change', listener);
    };
  });
};
