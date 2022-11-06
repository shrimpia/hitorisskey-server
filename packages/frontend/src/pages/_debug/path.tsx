import { Component, createSignal } from "solid-js";
import { IS_DEVELOPMENT } from "../../global-const";

import { useTitle } from "../../hooks/use-title";
import NotFound from "../[...all]";

const DebugPath: Component = () => {
  if (!IS_DEVELOPMENT) return <NotFound />

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
