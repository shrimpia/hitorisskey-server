import { Component, createEffect, onMount } from "solid-js";
import { LoadingView } from "../../components/views/primitives/loading-view";
import { updateClientState } from "../../store/client";

const DebugLoading: Component = () => {

  createEffect(() => {
    updateClientState({ title: 'Debug :: LoadingView' });
  });

  return (
    <LoadingView />
  );
};

export default DebugLoading;
