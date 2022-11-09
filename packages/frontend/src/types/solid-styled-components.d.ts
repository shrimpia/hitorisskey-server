import 'solid-styled-components';
import { TagArgs } from 'solid-styled-components';

type GlobalStyleProp = {
  fontSize: number;
  accentColor: DesignSystemColor,
};

declare module 'solid-styled-components' {
  export declare function createGlobalStyles(
    tag: TemplateStringsArray,
    ...tagArgs: TagArgs<GlobalStyleProp>
  ): (p: GlobalStyleProp) => null;
}