import { Link } from "solid-app-router";
import { Component, createEffect, createMemo, For, Match, Show, Switch } from "solid-js";
import { styled } from "solid-styled-components";
import { clientState, TitleObject } from "../../store/client";

const TitleView: Component<{title: string | TitleObject}> = (p) => {
  createEffect(() => {
    console.log(p.title);
  });

  const Wrapper = styled.span`
    &:not(:last-child) {
      color: var(--dimmed);
      &::after {
        content: '/';
        margin: 0 4px;
        color: var(--dimmed);
      }
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: underline;
    color: var(--dimmed);
  `;

  return (
    <Wrapper>
      {typeof p.title === 'string' ? p.title : (
        p.title.link ? <StyledLink href={p.title.link}>{p.title.label}</StyledLink> : p.title.label
      )}
    </Wrapper>
  );
};

export const MainLayoutTitle: Component = () => {
  createEffect(() => {
    console.log(Array.isArray(clientState.title));
  });

  return (
    <Show when={Array.isArray(clientState.title)} fallback={<TitleView title={clientState.title as any} />}>
      <For each={clientState.title as any[]} children={it => (
          <TitleView title={it} />
      )}/>
    </Show>
  );
};