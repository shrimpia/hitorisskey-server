import { useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import { ChannelView } from '../../components/views/ChannelView';
import { useTitle } from '../../hooks/use-title';
import { getChannelNameLocalized } from '../../misc/get-channel-name-localized';
import { session } from '../../store/session';
import { $t } from '../../text';

const Channel: Component = () => {
  const param = useParams();

  useTitle(() => getChannelNameLocalized(param.channel));

  const Container = styled.div`
    margin-bottom: 60px;
  `;

  return (
    <>
      <Show when={param.channel !== 'announce'}>
        <p class="text-dimmed mb-4 text-bold">{($t.$channelDescriptions as Record<string, string>)[param.channel]}</p>
      </Show>
      <Container>
        <ChannelView channel={param.channel} showComposer={param.channel !== 'announce' || session.user?.role === 'Admin'} showReloadButton />
      </Container>
    </>
  );
};

export default Channel;
