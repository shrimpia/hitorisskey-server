import { Component, onMount } from "solid-js";
import { updateClientState } from "../store/client";
import { $t } from "../text";

const BottleMail: Component = () => {
  onMount(() => {
    updateClientState({ title: $t.bottleMail });
  });

  return (
    <p>TBD</p>
  );
};

export default BottleMail;
