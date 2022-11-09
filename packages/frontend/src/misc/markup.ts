import * as T from 'terrario';

/* eslint @typescript-eslint/ban-ts-comment: 1 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import twemojiRegex from 'twemoji-parser/dist/lib/regex';

const emoji = new RegExp(twemojiRegex.source);

const lang = T.createLanguage({
  root: r => r.inline.many(0),
  inline: r => T.alt([
    r.newLine,
    r.url,
    r.emoji,
    r.text,
  ]),
  newLine: () => T.newline.map(() => ({ type: 'newLine' })),
  url: () => T.str(/https?:\/\/[\w/:%#$&?()~.=+-]+/).map(url => ({ type: 'url', url })),
  emoji: () => T.str(emoji).map(emoji => ({ type: 'emoji', emoji })),
  text: () => T.char,
});

export type MarkupNode = {
  type: 'newLine',
} | {
  type: 'url',
  url: string,
} | {
  type: 'emoji',
  emoji: string,
} | {
  type: 'text',
  text: string,
};

export const parse = (input: string) => {
  const output: MarkupNode[] = [];
  const textBuffer: string[] = [];

  const result = lang.root.parse(input);
  if (!result.success) throw new Error('Parser Error');

  const pushText = () => {
    if (textBuffer.length === 0) return;

    output.push({
      type: 'text',
      text: textBuffer.join(''),
    });
    textBuffer.length = 0;
  };

  for (const node of result.value) {
    if (typeof node === 'string') {
      textBuffer.push(node);
    } else {
      pushText();
      output.push(node);
    }
  }
  pushText();

  return output;
};
