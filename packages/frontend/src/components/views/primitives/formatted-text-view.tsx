import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

export type FormattedTextViewProp = {
  children: string | null;
  inline?: boolean;
};

export const FormattedTextView: Component<FormattedTextViewProp> = (p) => {
  const tag = p.inline ? 'span' : 'div';
  if (!p.children) return <Dynamic component={tag} />
  const inner = p.children.split('\n').flatMap(t => [t, <br/>]);
  inner.pop();
  return (
    <Dynamic component={tag}>{inner}</Dynamic>
  );
};