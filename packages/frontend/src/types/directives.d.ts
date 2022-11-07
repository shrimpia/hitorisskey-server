import { Signal } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      model: Signal;
    }
  }
}
