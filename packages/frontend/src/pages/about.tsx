import { Component, onMount } from "solid-js";
import { updateClientState } from "../store/client";
import { $t } from "../text";

const BottleMail: Component = () => {
  onMount(() => {
    updateClientState({ title: $t.about });
  });

  return (
    <article>
      <p>ひとりすきーは、独り言に特化したサービスです。</p>
      <p>Xeltica Studioが2020年から開発・運営しています。</p>
    </article>
  );
};

export default BottleMail;
