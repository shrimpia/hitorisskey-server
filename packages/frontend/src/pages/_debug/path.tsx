import { Component, createSignal } from "solid-js";

import { useTitle } from "../../hooks/use-title";

const DebugPath: Component = () => {
  const [path, setPath] = createSignal([{
    label: 'Debug',
    link: '/_debug',
  }, 'Path']);
  useTitle(path);

  return (
    <div>
      <button class="btn primary" onClick={() => {
        setPath(p => [ ...p, 'A' ]);
      }}>Add path element</button>
    </div>
  );
};

export default DebugPath;
