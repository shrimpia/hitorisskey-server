import { Component } from 'solid-js';
import { useTitle } from '../hooks/use-title';
import { $t } from '../text';

const BottleMail: Component = () => {
  useTitle($t.about);

  return (
    <article>
      <p>ひとりすきーは、独り言に特化したサービスです。</p>
      <p>Xeltica Studioが2020年から開発・運営しています。</p>
    </article>
  );
};

export default BottleMail;
