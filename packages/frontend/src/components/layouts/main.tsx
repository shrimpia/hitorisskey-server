import { ParentComponent } from "solid-js";
import { styled } from "solid-styled-components";

import { clientState } from "../../store/client";
import { MainLayoutSidebar } from "./main.sidebar";

export const MainLayout: ParentComponent = (p) => {
  const SIDEBAR_WIDTH = 256;

  const Main = styled.div`
    margin-left: ${SIDEBAR_WIDTH}px;
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

  return (
    <div class="relative">
      <MainLayoutSidebar width={SIDEBAR_WIDTH} />
      <Main class="relative">
        <Titlebar>
          <div class="pa-2">
            <h1 class="text-100 ma-0">
              {clientState.title}
            </h1>
          </div>
        </Titlebar>
        <div class="container">
          {p.children}
        </div>
      </Main>
    </div>
  );
};