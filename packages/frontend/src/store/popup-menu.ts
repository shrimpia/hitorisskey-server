import { createStore } from "solid-js/store";
import { MenuDefinition } from "../misc/menu-definition";

const [popupMenuState, updatePopupMenuState] = createStore({
  x: 0,
  y: 0,
  items: null as MenuDefinition | null,
  show: false,
});

type MenuLocation = {x: number; y: number} | HTMLElement;

const openMenu = (items: MenuDefinition, loc: MenuLocation) => {
  let x: number, y: number;
  if ('innerText' in loc) {
    const {left, bottom} = loc.getBoundingClientRect();
    x = left;
    y = bottom;
  } else {
    x = loc.x;
    y = loc.y;
  }

  updatePopupMenuState({
    x, y, items, show: true,
  });
};

const closeMenu = () => {
  updatePopupMenuState({
    show: false,
  });
};

export {
  popupMenuState,
  updatePopupMenuState,
  openMenu,
  closeMenu,
};
