import { useParams } from "solid-app-router";
import { Component, createEffect, For, onMount } from "solid-js";
import { updateClientState } from "../../store/client";
import { $t } from "../../text";

const Channel: Component = () => {
  const param = useParams();

  createEffect(() => {
    updateClientState({ title: ($t.$channels as Record<string, string>)[param.channel] ?? param.channel });
  });

  return (
    <p>あ</p>
  );
};

export default Channel;
