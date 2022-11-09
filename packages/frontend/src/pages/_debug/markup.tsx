import { Component, createMemo, createSignal } from 'solid-js';

import { ShowWhenDev } from '../../components/util/ShowWhenDev';
import { FormattedTextView } from '../../components/views/primitives/FormattedTextView';
import { model } from '../../directives/model';
import { useTitle } from '../../hooks/use-title';
import { parse } from '../../misc/markup';

0 && model;

const DebugMarkup: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'Markup']);

  const [input, setInput] = createSignal('');

  const result = createMemo(() => JSON.stringify(parse(input()), null, '    '));

  return (
    <ShowWhenDev>
      <div class="vstack">
        <div class="card">
          <div class="body">
            <h1>入力</h1>
            <textarea class="input-field" use:model={[input, setInput]} />
          </div>
        </div>
        <div class="card">
          <div class="body">
            <h1>出力</h1>
            <FormattedTextView>{input()}</FormattedTextView>
          </div>
        </div>
        <details open>
          <summary>ツリー</summary>
          <pre>
            <code>
              {result()}
            </code>
          </pre>
        </details>
      </div>
    </ShowWhenDev>
  );
};

export default DebugMarkup;
