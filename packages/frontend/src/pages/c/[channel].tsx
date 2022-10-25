import { useParams } from "solid-app-router";
import { Component, createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import { ChannelView } from "../../components/views/channel-view";
import { updateClientState } from "../../store/client";
import { $t } from "../../text";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Channel: Component = () => {
  const param = useParams();

  createEffect(() => {
    updateClientState({ title: ($t.$channels as Record<string, string>)[param.channel] ?? param.channel });
  });

  return (
    <Container>
      <ChannelView channel={param.channel} />
    </Container>
  );
};

export default Channel;
