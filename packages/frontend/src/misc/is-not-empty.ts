export const isNotEmpty = (value: string | null | undefined) => !!value && value.length > 0;

export const isNotEmptyAll = (...value: Array<string | null | undefined>) => value.every(isNotEmpty);
