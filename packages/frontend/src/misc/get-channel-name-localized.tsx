import { $t } from "../text";

export const getChannelNameLocalized = (channel: string) => ($t.$channels as Record<string, string>)[channel] ?? channel;
