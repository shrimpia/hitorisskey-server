import { Component } from 'solid-js';
import { model } from '../../directives/model';

import { useTitle } from '../../hooks/use-title';
import { app } from '../../store/app';
import { $t } from '../../text';

0 && model;

const AdminSettings: Component = () => {
  useTitle($t.$settings.$admin.settings);

  return (
    <div class="vstack">
      <div class="alert">
        <i class="icon fas fa-exclamation-triangle fa-fw" />
        現在、こちらの画面では設定を変更できません。設定ファイルを編集してください。
      </div>
      <div>
        <h2>全体</h2>
        <div class="list-form">
          <div class="item">
            <div class="body">
              <h1>ベータテスト</h1>
              <p class="desc">一部機能がベータテスト用の仕様となります。</p>
            </div>
            <div class="command">
              <label class="input-switch">
                <input type="checkbox" checked={app.meta?.isClosedBeta ?? false} disabled />
                <div class="switch" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card pa-2">
        <h2>スポンサー</h2>
        <h3>継続支援者</h3>
        <textarea class="input-field" rows={5} disabled />
        <button class="btn primary my-1 block ml-auto" disabled>{$t.save}</button>
        <h3>単発支援者</h3>
        <textarea class="input-field" rows={5} disabled />
        <button class="btn primary my-1 block ml-auto" disabled>{$t.save}</button>
      </div>
    </div>
  );
};

export default AdminSettings;
