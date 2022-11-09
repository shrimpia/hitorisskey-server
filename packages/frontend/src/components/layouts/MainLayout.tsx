import { createSignal, onCleanup, onMount, ParentComponent, Show } from 'solid-js';
import { css, styled } from 'solid-styled-components';
import { clientState } from '../../store/client';

import { MainLayoutSidebar } from './MainLayoutSidebar';
import { MainLayoutTitle } from './MainLayoutTitle';

export const MainLayout: ParentComponent = (p) => {
  const [isDrawerOpen, setDrawerOpen] = createSignal(false);
  const [isTitlebarVisible, setTitlebarVisible] = createSignal(false);

  const titleObserver = new IntersectionObserver((e) => {
    setTitlebarVisible(!e[0].isIntersecting);
  }, {
    threshold: 0.5,
  });

  let titleBarRef: HTMLElement | undefined = undefined;

  const SIDEBAR_WIDTH = 256;

  const SidebarColumn = styled.div`
    position: fixed;
    background-color: var(--bg);
    z-index: 10000;
    left: 0;
    top: 0;
    height: 100vh;
    border-right: 1px solid var(--tone-5);
    padding: var(--margin);
  `;

  const Drawer = styled.div`
    z-index: 1000000;
  `;

  const Main = styled.div<{isMobile: boolean}>`
    margin-left: ${p => p.isMobile ? 0 : SIDEBAR_WIDTH}px;
  `;

  const Titlebar = styled.div<{isMobile: boolean}>`  
    position: fixed;
    z-index: 10000;
    left: ${p => p.isMobile ? 0 : SIDEBAR_WIDTH}px;
    right: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid var(--tone-5);
    background: var(--hs-titlebar-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transition: all 0.2s ease-out;
    opacity: 0;
    transform: translateY(-100%);

    &.active {
      transform: none;
      opacity: 1;
    }
  `;

  const notFullViewStyle = css`
    max-width: 800px;
    margin: 0 auto;
  `;

  onMount(() => {
    if (!titleBarRef) return;
    titleObserver.observe(titleBarRef);
  });

  onCleanup(() => {
    titleObserver.disconnect();
  });

  return (
    <div class="relative">
      <Show when={!clientState.isMobile}>
        <SidebarColumn style={{width: SIDEBAR_WIDTH + 'px'}}>
          <MainLayoutSidebar width={SIDEBAR_WIDTH} />
        </SidebarColumn>
      </Show>
      <Show when={clientState.isMobile}>
        <Drawer class={`drawer-container ${isDrawerOpen() ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}>
          <div class="backdrop" />
          <div class="drawer">
            <div class="pa-2">
              <MainLayoutSidebar width={SIDEBAR_WIDTH} />
            </div>
          </div>
        </Drawer>
      </Show>
      <Main isMobile={clientState.isMobile} class="relative">
        <Titlebar isMobile={clientState.isMobile} class="flex" classList={{active: isTitlebarVisible()}}>
          <Show when={clientState.isMobile}>
            <button class="btn flat ml-2" onClick={() => setDrawerOpen(true)}>
              <i class="fas fa-bars" />
            </button>
          </Show>
          <div class="pa-2">
            <h1 class="text-100 ma-0">
              <MainLayoutTitle />
            </h1>
          </div>
        </Titlebar>
        <div class="container" classList={{[notFullViewStyle]: !clientState.fullView, 'mt-5': !clientState.isMobile}}>
          <h1 ref={titleBarRef} class="text-bold mb-2" classList={{'text-200': !clientState.isMobile, 'text-150': clientState.isMobile}}>
            <Show when={clientState.isMobile}>
              <button class="btn flat text-150 mr-1" style={{'vertical-align': clientState.isMobile ? '0' : '0.1em'}} onClick={() => setDrawerOpen(true)}>
                <i class="fas fa-bars" />
              </button>
            </Show>
            <MainLayoutTitle />
          </h1>
          {p.children}
        </div>
      </Main>
    </div>
  );
};