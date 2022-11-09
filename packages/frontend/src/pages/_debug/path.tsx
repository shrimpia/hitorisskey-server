import { Component, createSignal } from 'solid-js';

import { ShowWhenDev } from '../../components/util/ShowWhenDev';
import { useTitle } from '../../hooks/use-title';

const DebugPath: Component = () => {

  const [path, setPath] = createSignal([{
    label: 'Debug',
    link: '/_debug',
  }, 'Path']);
  useTitle(path);

  return (
    <ShowWhenDev>
      <button class="btn primary" onClick={() => {
        setPath(p => [ ...p, 'A' ]);
      }}>Add path element</button>
    </ShowWhenDev>
  );
};

export default DebugPath;
