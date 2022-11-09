import { Component, createSignal, onMount, onCleanup, batch } from 'solid-js';

import { ShowWhenDev } from '../../components/util/ShowWhenDev';
import { PopupView } from '../../components/views/PopupView';
import { useTitle } from '../../hooks/use-title';

const DebugPopup: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'PopupView']);

  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [show, setShow] = createSignal(false);

  const onClick = (e: MouseEvent) => {
    if (!e.shiftKey) return;
    batch(() => {
      setX(e.x);
      setY(e.y);
      setShow(true);
    });
  };

  onMount(() => {
    window.addEventListener('click', onClick, { passive: true });
  });

  onCleanup(() => {
    window.removeEventListener('click', onClick);
  });

  return (
    <ShowWhenDev>
      <p>画面上の任意位置をSHIFT+クリック</p>
      <PopupView x={x()} y={y()} show={show()} onClose={() => setShow(false)}>
        <p class="pa-2"><button class="btn" onClick={() => alert('ほに')}>ほに</button></p>
      </PopupView>
    </ShowWhenDev>
  );
};

export default DebugPopup;
