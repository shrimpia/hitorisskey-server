import { Component } from 'solid-js';

import { useTitle } from '../hooks/use-title';
import { $t } from '../text';

const BottleMail: Component = () => {
  useTitle($t.bottleMail);

  return (
    <div>
      <h2>ボトルメール <span class="text-125 text-dimmed">v1.1で登場予定</span></h2>
      <p>
        誰かが拾ってくれるかもしれない。そんなゆるやかな気持ちで書くメール。<br/>
        拾った人が返信を書いてくれたら、顔も名前も知らない誰かとのコミュニケーションが始まります。
      </p>
      <p>ひとりすきー 1.1でリリース予定。お楽しみに。</p>
    </div>
  );
};

export default BottleMail;
