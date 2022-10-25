import { Component, createEffect, onMount } from "solid-js";
import { Post } from "../../api/models/post";
import { PostView } from "../../components/views/post-view";
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
