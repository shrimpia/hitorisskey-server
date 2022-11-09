import { ParentComponent, Show } from 'solid-js';
import { IS_DEVELOPMENT } from '../../global-const';
import NotFound from '../../pages/[...all]';

export const ShowWhenDev: ParentComponent = (p) => {
  return (
    <Show when={IS_DEVELOPMENT} fallback={<NotFound />}>
      {p.children}
    </Show>
  );
};