import { createSignal, ParentComponent, Show } from "solid-js";
import { css, styled } from "solid-styled-components";
import { clientState } from "../../store/client";

import { MainLayoutSidebar } from "./MainLayoutSidebar";
import { MainLayoutTitle } from "./MainLayoutTitle";

export const MainLayout: ParentComponent = (p) => {
  const [isDrawerOpen, setDrawerOpen] = createSignal(false);

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

  const Titlebar = styled.div`  
    position: sticky;
    z-index: 10000;
    left: $sidebarWidth;
    right: 0;
    top: 0;
    border-bottom: 1px solid var(--tone-5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  `;

  const notFullViewStyle = css`
    max-width: 800px;
    margin: 0 auto;
  `;

  return (
    <div class="relative">
      <Show when={!clientState.isMobile}>
        <SidebarColumn style={`width: ${SIDEBAR_WIDTH}px`}>
          <MainLayoutSidebar width={SIDEBAR_WIDTH} />
        </SidebarColumn>
      </Show>
      <Show when={clientState.isMobile}>
        <Drawer class={`drawer-container ${isDrawerOpen() ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}>
          <div class="backdrop"></div>
          <div class="drawer">
            <div class="pa-2">
              <MainLayoutSidebar width={SIDEBAR_WIDTH} />
            </div>
          </div>
        </Drawer>
      </Show>
      <Main isMobile={clientState.isMobile} class="relative">
        <Titlebar class="flex">
          <Show when={clientState.isMobile}>
            <button class="btn flat ml-2" onClick={() => setDrawerOpen(true)}>
              <i class="fas fa-bars"></i>
            </button>
          </Show>
          <div class="pa-2">
            <h1 class="text-100 ma-0">
              <MainLayoutTitle />
            </h1>
          </div>
        </Titlebar>
        <div class="container" classList={{[notFullViewStyle]: !clientState.fullView}}>
          {p.children}
        </div>
      </Main>
    </div>
  );
};