import { Component } from "solid-js";
import { MenuDefinition, MenuView } from "../../components/views/menu-view";

const DebugMenu: Component = () => {
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
