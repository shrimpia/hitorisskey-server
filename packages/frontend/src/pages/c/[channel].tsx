import { useParams } from "solid-app-router";
import { Component, createEffect, For, onMount } from "solid-js";
import { updateClientState } from "../../store/client";

const channelNameMap = {
  private: 'プライベートルーム',
  public: 'みんなのつぶやき',
  realtime: 'みんなの広場',
};

const Channel: Component = () => {
  const param = useParams();

  createEffect(() => {
    updateClientState({ title: param.channel });
  });

  return (
    <p>あ</p>
  );
};

export default Channel;
