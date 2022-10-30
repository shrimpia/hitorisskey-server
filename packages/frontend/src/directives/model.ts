import { createRenderEffect } from "solid-js";

export function model(el: HTMLInputElement, value: any) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener("input", (e) => setField((e.target as HTMLInputElement)?.value));
}
