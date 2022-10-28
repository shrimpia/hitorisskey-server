import { Link } from "solid-app-router";
import { Component, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { MenuDefinition, MenuGroup, MenuItem } from "../../misc/menu-definition.js";

export type MenuViewProp = {
  items: MenuDefinition;
  onClick?: VoidFunction;
};

export const MenuView: Component<MenuViewProp> = (p) => {
  const MenuGroupView: Component<{item: MenuGroup, onClick?: VoidFunction}> = (p) => {
    return (
      <section>
        <Show when={p.item.title}><h1>{p.item.title}</h1></Show>
        <For each={p.item.items} children={it => <MenuItemView item={it} onClick={p.onClick} />} />
      </section>
    );
  };
  
  const MenuItemView: Component<{item: MenuItem, onClick?: VoidFunction}> = (p) => {
    const tag = () => p.item.to ? Link : p.item.href ? 'a' : 'div';
    const onClickItem = () => {
      if (p.onClick) p.onClick();
      if (p.item.onClick) p.item.onClick();
    };
    return (
      <Dynamic component={tag()} href={p.item.to ?? p.item.href} onClick={onClickItem} class={`item ${p.item.danger ? 'text-danger' : ''} ${p.item.disabled ? 'disabled' : ''}`} role="listitem">
        <i class={`icon ${p.item.iconClass} ${p.item.danger ? 'text-danger' : ''}`} />
        {p.item.label}
      </Dynamic>
    );
  };

  return (
    <div class="menu">
      <For each={p.items}>
        {it => 'items' in it ? <MenuGroupView item={it} onClick={p.onClick} /> : <MenuItemView item={it} onClick={p.onClick} />}
      </For>
    </div>
  );
};
