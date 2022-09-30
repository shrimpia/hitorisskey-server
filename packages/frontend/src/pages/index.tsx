import { Component, Show } from "solid-js";
import { IndexSesson as IndexSession } from "../components/layouts/index-session";
import { IndexWelcome } from "../components/layouts/index-welcome";
import { session } from "../store/session";

const Index: Component = () => {
  return (
    <Show when={session.token} fallback={<IndexWelcome />}>
      <IndexSession />
    </Show>
  );
}

export default Index;
