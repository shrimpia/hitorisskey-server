import { Component } from "solid-js";
import { MenuView } from "../../components/views/MenuView";

import { EmojiView } from "../../components/views/primitives/EmojiView";
import { useTitle } from "../../hooks/use-title";
import { MenuDefinition } from "../../misc/menu-definition";

const DebugIndex: Component = () => {
  useTitle('Debug');

  const items: MenuDefinition = [
    'emoji',
    'loading',
    'menu',
    'popup',
    'post',
    'markup',
    'path',
  ].map(label => ({
    label,
    iconClass: 'fas fa-chevron-right',
    to: `/_debug/${label}`,
  }));

  return (
    <MenuView items={items} />
  );
};

export default DebugIndex;
