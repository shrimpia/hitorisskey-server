import { Component, onMount } from "solid-js";
import { MainLayout } from "../components/layouts/main";
import { updateClientState } from "../store/client";

const BottleMail: Component = () => {
  onMount(() => {
    updateClientState({ title: 'ボトルメール' });
  });

  return (
    <p>TBD</p>
  );
};

export default BottleMail;
