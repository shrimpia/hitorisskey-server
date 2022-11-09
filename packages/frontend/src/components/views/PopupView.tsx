import { batch, createEffect, createMemo, createSignal, ParentComponent, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import { getPopupRef } from '../../misc/ref';

export type PopupViewProp = {
  x: number;
  y: number;
  show: boolean;
  denyBackdropClick?: boolean;
  onClose?: () => void;
};

export const PopupView: ParentComponent<PopupViewProp> = (p) => {
  let cardRef: HTMLElement | undefined = undefined;
  const PADDING = 8;
  // 画面外対策用に内部でx, yを管理している
  const [internalX, setX] = createSignal(0);
  const [internalY, setY] = createSignal(0);
  // アニメーション用に内部でshowを管理している
  const [internalShow, setShow] = createSignal(false);
  const [isActive, setActive] = createSignal(false);

  const style = createMemo(() => `left: ${internalX()}px; top: ${internalY()}px`);

  // const style = createMemo(() => `left: ${x()}px; top: ${y()}px`);

  const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 10000000;
  `;
  
  const Card = styled.div`
    position: fixed;
    z-index: 9999999;
    min-width: 200px;
    transition: all 0.12s ease-out;
    opacity: 0;
    transform: translateY(6px);
    
    &.active {
      opacity: 1;
      transform: none;
    }
  `;

  const onClickBackdrop = () => {
    if (!p.denyBackdropClick && p.onClose) p.onClose();
  };

  createEffect(() => {
    if (p.show) {
      setX(p.x);
      setY(p.y);
      // 画面外に行かないよう調整する
      requestAnimationFrame(() => {
        batch(() => {
          if (!cardRef) return;
          const clientWidth = window.innerWidth - PADDING;
          const clientHeight = window.innerHeight - PADDING;
          const {left, top, right, bottom, width, height} = cardRef.getBoundingClientRect();
    
          if (left < PADDING) setX(PADDING);
          if (top < PADDING) setY(PADDING);
          if (clientWidth < right) setX(clientWidth - width);
          if (clientHeight < bottom) setY(clientHeight - height);
        });
      });
    }
  });

  createEffect(() => {
    if (p.show) {
      setShow(true);
      requestAnimationFrame(() => {
        setActive(true);
      });
    } else {
      setActive(false);
      setTimeout(() => {
        // 0.3秒後にp.show = trueかもしれない
        setShow(p.show);
      }, 300);
    }
  });

  return (
    <Show when={internalShow()}>
      <Portal mount={getPopupRef()}>
        <Backdrop onClick={onClickBackdrop}>
          <Card ref={cardRef} class="card shadow-4" style={style()} classList={{active: isActive()}} onClick={e => e.stopPropagation()}>
            {p.children}
          </Card>
        </Backdrop>
      </Portal>
    </Show>
  );
};