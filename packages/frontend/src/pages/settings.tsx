import { Component, onMount } from "solid-js";
import { MainLayout } from "../components/layouts/main";
import { updateClientState } from "../store/client";
import { $t } from "../text";

const Settings: Component = () => {
  onMount(() => {
    updateClientState({title: $t.settings});
  });
  return (
    <p>TBD</p>
  );
};

export default Settings;
