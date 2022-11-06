import { Component } from "solid-js";
import { MenuView } from "../../components/views/MenuView";

import { EmojiView } from "../../components/views/primitives/EmojiView";
import { IS_DEVELOPMENT } from "../../global-const";
import { useTitle } from "../../hooks/use-title";
import { MenuDefinition } from "../../misc/menu-definition";
import NotFound from "../[...all]";

const DebugIndex: Component = () => {
  if (!IS_DEVELOPMENT) return <NotFound />

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
