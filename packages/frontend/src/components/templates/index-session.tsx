import { Component, For, onMount } from "solid-js";
import { updateClientState } from "../../store/client";
import { MainLayout } from "../layouts/main";

export const IndexSessionTemplate: Component = () => {
  const data = Array(100).fill(null).map((_, i) => i);
  
  onMount(() => {
    updateClientState({ title: 'ホーム' });
  });

  return (
    <p>あ</p>
  );
};
