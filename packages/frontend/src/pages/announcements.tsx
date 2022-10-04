import { Component, onMount } from "solid-js";
import { updateClientState } from "../store/client";
import { $t } from "../text";

const Announcements: Component = () => {
  onMount(() => {
    updateClientState({ title: $t.announcements });
  });
  return (
    <p>TBD</p>
  );
};

export default Announcements;
