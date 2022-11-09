import { Component, createMemo, For, Match, Switch } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { parse } from '../../../misc/markup';
import { EmojiView } from './EmojiView';
import { UrlView } from './UrlView';

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
        <Match when={node.type === 'emoji'}><EmojiView emoji={((node as Record<string, string>).emoji)} /></Match>
        <Match when={node.type === 'url'}><UrlView url={((node as Record<string, string>).url)} /></Match>
        <Match when={node.type === 'text'}>{((node as Record<string, string>).text)}</Match>
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