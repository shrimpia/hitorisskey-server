import { Link } from "solid-app-router";
import { Component, For } from "solid-js";
import { Dynamic } from "solid-js/web";

type FontAwesomeIconType = string;

type FontAwesomeSolidIconClassString = `fas fa-${FontAwesomeIconType}` | `fas fa-${FontAwesomeIconType} fa-fw`;
type FontAwesomeRegularIconClassString = `far fa-${FontAwesomeIconType}` | `far fa-${FontAwesomeIconType} fa-fw`;
type FontAwesomeBrandIconClassString = `fab fa-${FontAwesomeIconType}` | `fab fa-${FontAwesomeIconType} fa-fw`;

type FontAwesomeIconClassString =
  | FontAwesomeSolidIconClassString
  | FontAwesomeRegularIconClassString
  | FontAwesomeBrandIconClassString
  ;

type IconClassString = FontAwesomeIconClassString;

export type MenuItem = {
  iconClass: IconClassString;
  label: string;
  danger?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type MenuDefinition = (MenuItem | MenuGroup)[];

export type MenuViewProp = {
  items: MenuDefinition;
  onClick?: VoidFunction;
};

export const MenuView: Component<MenuViewProp> = (p) => {
  return (
    <div class="menu">
      <For each={p.items}>
        {it => 'items' in it ? <MenuGroupView item={it} onClick={p.onClick} /> : <MenuItemView item={it} onClick={p.onClick} />}
      </For>
    </div>
  );
};

const MenuGroupView: Component<{item: MenuGroup, onClick?: VoidFunction}> = (p) => {
  return (
    <section>
      <h1>{p.item.title}</h1>
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
    <Dynamic component={tag()} href={p.item.to ?? p.item.href} onClick={onClickItem} class={`item ${p.item.danger ? 'text-danger' : ''}`} role="listitem">
      <i class={`icon ${p.item.iconClass} ${p.item.danger ? 'text-danger' : ''}`} />
      {p.item.label}
    </Dynamic>
  );
};
