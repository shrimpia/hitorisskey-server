import { createRenderEffect, Signal } from 'solid-js';

export function model(el: HTMLInputElement, value: () => Signal<string>) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener('input', (e) => setField((e.target as HTMLInputElement)?.value));
}
