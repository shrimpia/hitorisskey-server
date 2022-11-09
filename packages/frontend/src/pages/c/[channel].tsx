import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { ChannelView } from '../../components/views/ChannelView';
import { useTitle } from '../../hooks/use-title';
import { $t } from '../../text';

const Channel: Component = () => {
  const param = useParams();

  useTitle(() => ($t.$channels as Record<string, string>)[param.channel] ?? param.channel);

  return (
    <>
      <Show when={param.channel !== 'announce'}>
        <p class="text-dimmed mb-4 text-bold">{($t.$channelDescriptions as Record<string, string>)[param.channel]}</p>
      </Show>
      <ChannelView channel={param.channel} />
    </>
  );
};

export default Channel;
