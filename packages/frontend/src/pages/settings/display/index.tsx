import { A } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import { styled } from 'solid-styled-components';
import { IS_DEVELOPMENT } from '../../../global-const';

import { useTitle } from '../../../hooks/use-title';
import { clientState, DesignSystemColor, designSystemColors, ThemeProp, updateClientState } from '../../../store/client';
import { $t } from '../../../text';


const SettingsDisplay: Component = () => {
  useTitle([{
    label: $t.settings,
    link: '/settings',
  }, $t.$settings.display]);

  const ColorInput = styled.input<{color: string}>`
    display: block;
    appearance: none;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background-color: var(--panel);
    border: 4px solid var(--${p => p.color});
    cursor: pointer;
    transition: all 0.2s ease;
    &:checked {
      background: var(--${p => p.color});
      cursor: default;
    }
    &:hover, &:focus {
      box-shadow: 0 0 16px var(--${p => p.color});
      outline: none;
    }
  `;

  const themes: ThemeProp[] = ['light', 'dark', 'system'];

  const sizes: number[] = [14, 16, 20, 24];

  return (
    <div class="vstack">
      <div class="alert bg-primary">
        <i class="icon fas fa-info-circle" />
        {$t.$settings.$display.alertInfo}
      </div>
      <div class="card">
        <div class="body vstack">
          <h1>{$t.$settings.$display.theme}</h1>
          <For each={themes} children={t => (
            <label class="input-check">
              <input type="radio" value={t} checked={t === clientState.theme} onChange={e => updateClientState({theme: e.currentTarget.value as ThemeProp})} />
              <span>{$t.$settings.$display.$theme[t]}</span>
            </label>
          )} />
        </div>
      </div>
      <div class="card">
        <div class="body">
          <h1>{$t.$settings.$display.accentColor}</h1>
          <h2>{$t.$settings.$display.accentColorDescription}</h2>
          <div class="hstack slim wrap my-2">
            <For each={designSystemColors} children={c => (
              <ColorInput class="shadow-2" type="radio" color={c} value={c} checked={c === clientState.accentColor} onChange={e => updateClientState({accentColor: e.currentTarget.value as DesignSystemColor})} />
            )} />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="body vstack">
          <h1>{$t.$settings.$display.fontSize}</h1>
          <For each={sizes} children={size => (
            <label class="input-check">
              <input type="radio" value={size.toString()} checked={size === clientState.fontSize} onChange={e => updateClientState({fontSize: Number(e.currentTarget.value)})} />
              <span style={{'font-size': size + 'px'}}>{size}px</span>
            </label>
          )} />
        </div>
      </div>
      <button class="btn primary ml-auto" onClick={() => {
        if (!confirm('この操作を行うと、設定したテーマが失われます。本当に続行しますか？')) return;
        updateClientState({
          fontSize: 16,
          accentColor: 'green',
          theme: 'system',
        });
      }}>{$t.$settings.initialize}</button>
      <div class="list-form">
        <A href="/settings/display/css" class="item">
          <i class="icon fas fa-code fa-fw" />
          <div class="body">{$t.$settings.$display.customCSS}</div>
        </A>
        <Show when={IS_DEVELOPMENT}>
          <div class="item">
            <i class="icon fas fa-bug fa-fw" />
            <div class="body">
              <h1>Activate Debug Mode</h1>
            </div>
            <div class="command">
              <label class="input-switch">
                <input type="checkbox" checked={clientState.isDebugMode} onChange={e => updateClientState({isDebugMode: e.currentTarget.checked})}  />
                <div class="switch" />
              </label>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default SettingsDisplay;
