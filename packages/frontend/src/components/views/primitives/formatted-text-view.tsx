import { Component, createMemo, For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import { parse } from "../../../misc/markup";
import { EmojiView } from "./emoji-view";
import { UrlView } from "./url-view";

export type FormattedTextViewProp = {
  children: string | null;
  inline?: boolean;
};

const Markup: Component<{input: string}> = (p) => {
  const parsed = createMemo(() => parse(p.input));

  return (
    <For each={parsed()} children={node => (
      <Switch>
        <Match when={node.type === 'newLine'}><br/></Match>
        <Match when={node.type === 'emoji'}><EmojiView emoji={((node as any).emoji)} /></Match>
        <Match when={node.type === 'url'}><UrlView url={((node as any).url)} /></Match>
        <Match when={node.type === 'text'}>{((node as any).text)}</Match>
      </Switch>
    )} />
  );
};

export const FormattedTextView: Component<FormattedTextViewProp> = (p) => {
  return (
    <Dynamic component={p.inline ? 'span' : 'div'}>
      <Markup input={p.children ?? ''} />
    </Dynamic>
  );
};