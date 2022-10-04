import { Component, onMount } from "solid-js";
import { MainLayout } from "../components/layouts/main";
import { updateClientState } from "../store/client";

const Settings: Component = () => {
  onMount(() => {
    updateClientState({title: '設定'});
  });
  return (
    <p>TBD</p>
  );
};

export default Settings;
