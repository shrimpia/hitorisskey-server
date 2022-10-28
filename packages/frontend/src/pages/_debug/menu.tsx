import { Component } from "solid-js";

import { MenuView } from "../../components/views/menu-view";
import { useTitle } from "../../hooks/use-title";
import { MenuDefinition } from "../../misc/menu-definition";

const DebugMenu: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'MenuView']);

  const items: MenuDefinition = [{
    label: 'りんご',
    iconClass: 'fas fa-apple-whole fa-fw',
    onClick: () => alert('りんご'),
  }, {
    label: 'レモン',
    iconClass: 'fas fa-lemon fa-fw',
    onClick: () => alert('レモン'),
  }, {
    title: 'コマンド',
    items: [{
      label: '切り取り',
      iconClass: 'fas fa-scissors',
      onClick: () => alert('DONE'),
    }, {
      label: 'コピー',
      iconClass: 'fas fa-copy',
      onClick: () => alert('DONE'),
    }, {
      label: '貼り付け',
      iconClass: 'fas fa-paste',
      onClick: () => alert('DONE'),
    }],
  }];

  return (
    <MenuView items={items} />
  );
};

export default DebugMenu;
