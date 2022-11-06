import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export type TitleObject = {
  link?: string;
  label: string;
};

export type TitleProp = string | TitleObject | Array<string | TitleObject>;

export type ThemeProp = 'system' | 'light' | 'dark';

export const designSystemColors = [
	'red',
	'vermilion',
	'orange',
	'yellow',
	'lime',
	'green',
	'teal',
	'cyan',
	'skyblue',
	'blue',
	'indigo',
	'purple',
	'magenta',
	'pink',
];

export type DesignSystemColor = typeof designSystemColors[number];

const [clientState, updateClientState] = createStore({
  title: '' as TitleProp,
  fullView: false,
  lastChannel: 'public',
	isMobile: false,
  theme: (localStorage.getItem('theme') ?? 'system') as ThemeProp,
  accentColor: (localStorage.getItem('accentColor') ?? 'green') as DesignSystemColor,
  fontSize: Number(localStorage.getItem('fontSize') ?? '16'),
	isDebugMode: Boolean(localStorage.getItem('debug')),
	css: (localStorage.getItem('css') ?? ''),
});

export const updateMobile = () => {
	updateClientState({ isMobile: document.documentElement.clientWidth < 1000 });
};

export const updateCSS = () => {
	const style = document.getElementById('customCSS');
	if (!style) return;
	style.innerText = clientState.css;
};

updateMobile();

createEffect(() => localStorage.setItem('theme', clientState.theme));
createEffect(() => localStorage.setItem('accentColor', clientState.accentColor));
createEffect(() => localStorage.setItem('fontSize', clientState.fontSize.toString()));
createEffect(() => localStorage.setItem('debug', clientState.isDebugMode.toString()));
createEffect(() => {
	localStorage.setItem('css', clientState.css);
	updateCSS();
});

export {
  clientState,
  updateClientState,
};
