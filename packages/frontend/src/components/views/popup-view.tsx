import { createMemo, ParentComponent, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { styled } from "solid-styled-components";
import { getPopupRef } from "../../misc/ref";

export type PopupViewProp = {
  x: number;
  y: number;
  show: boolean;
  denyBackdropClick?: boolean;
  onClose?: () => void;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000000;
`;

export const PopupView: ParentComponent<PopupViewProp> = (p) => {
  const style = createMemo(() => `position: fixed; z-index:9999999; left: ${p.x}px; top:${p.y}px`);

  const onClickBackdrop = () => {
    if (!p.denyBackdropClick && p.onClose) p.onClose();
  };

  return (
    <Show when={p.show}>
      <Portal mount={getPopupRef()}>
        <Backdrop onClick={onClickBackdrop}>
          <div class="card shadow-4" style={style()} onClick={e => e.stopPropagation()}>
            {p.children}
          </div>
        </Backdrop>
      </Portal>
    </Show>
  );
};