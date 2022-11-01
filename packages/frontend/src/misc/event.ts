import {
  STCustomEvent,
  STEventTarget,
} from '@mizdra/strictly-typed-event-target';
import { Post } from '../api/models/post';

export interface HitorisskeyEventMap {
  postUpdate: {id: Post['id'], diff: Partial<Post>};
  postDelete: {id: Post['id']};
}

export type HitorisskeyEvent<T extends keyof HitorisskeyEventMap> = STCustomEvent<HitorisskeyEventMap, T>;

export const HitorisskeyEvent = (CustomEvent as unknown) as STCustomEvent<HitorisskeyEventMap>;

export const hitorisskeyEventTarget = new EventTarget() as STEventTarget<HitorisskeyEventMap>;
