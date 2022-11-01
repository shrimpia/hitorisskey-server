import { useParams } from "@solidjs/router";
import { Component, createEffect, createMemo } from "solid-js";

import { ChannelView } from "../../components/views/channel-view";
import { useTitle } from "../../hooks/use-title";
import { updateClientState } from "../../store/client";
import { $t } from "../../text";

const Channel: Component = () => {
  const param = useParams();

  useTitle(() => ($t.$channels as Record<string, string>)[param.channel] ?? param.channel);

  return (
    <>
      <p class="text-dimmed mb-4 text-bold">{($t.$channelDescriptions as Record<string, string>)[param.channel]}</p>
      <ChannelView channel={param.channel} />
    </>
  );
};

export default Channel;
