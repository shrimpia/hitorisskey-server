import { Component, createEffect, createSignal, onMount, onCleanup, batch } from "solid-js";
import { PopupView } from "../../components/views/popup-view";
import { updateClientState } from "../../store/client";

const DebugPopup: Component = () => {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [show, setShow] = createSignal(false);

  createEffect(() => {
    updateClientState({ title: 'Debug :: DebugPopup' });
  });

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
    <div>
      <p>画面上の任意位置をSHIFT+クリック</p>
      <PopupView x={x()} y={y()} show={show()} onClose={() => setShow(false)}>
        <p class="pa-2"><button class="btn" onClick={() => alert('ほに')}>ほに</button></p>
      </PopupView>
    </div>
  );
};

export default DebugPopup;
