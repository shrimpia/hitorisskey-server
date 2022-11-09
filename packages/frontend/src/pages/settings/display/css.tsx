import { Component, createMemo, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';

import { useTitle } from '../../../hooks/use-title';
import { clientState, updateClientState } from '../../../store/client';
import { $t } from '../../../text';

const SettingsDisplayCss: Component = () => {
  const [css, setCSS] = createSignal(clientState.css);

  const isSaveButtonDisabled = createMemo(() => css() === clientState.css);

  useTitle([{
    label: $t.settings,
    link: '/settings',
  }, {
    label: $t.$settings.display,
    link: '/settings/display',
  }, $t.$settings.$display.customCSS]);

  const Editor = styled.textarea`
    font-family: 'Courier New', Courier, 'Consolas', monospace;
    background: var(--panel) !important;
  `;

  const onClickSave = () => {
    updateClientState({css: css()});
  };

  return (
    <>
      <p class="text">{$t.$settings.$display.customCSSDescription}</p>
      <div class="alert bg-warn">
        <i class="icon fas fa-exclamation-triangle" />
        {$t.$settings.$display.customCSSWarning}
      </div>
      <Editor class="input-field mt-2" rows={10} value={css()} onInput={e => setCSS(e.currentTarget.value)} />
      <button class="btn primary block ml-auto mt-2" disabled={isSaveButtonDisabled()} onClick={onClickSave}>{$t.save}</button>
    </>
  );
};

export default SettingsDisplayCss;
