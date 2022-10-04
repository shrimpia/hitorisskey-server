import { Component, onMount } from "solid-js";
import { MainLayout } from "../components/layouts/main";
import { updateClientState } from "../store/client";

const Announcements: Component = () => {
  onMount(() => {
    updateClientState({ title: 'お知らせ' });
  });
  return (
    <p>TBD</p>
  );
};

export default Announcements;
