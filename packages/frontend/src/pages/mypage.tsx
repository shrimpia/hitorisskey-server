import { Component, createMemo, Show } from 'solid-js';
import { A } from '@solidjs/router';
import dayjs from 'dayjs';

import { ChannelView } from '../components/views/ChannelView';
import { useTitle } from '../hooks/use-title';
import { session } from '../store/session';
import { $t } from '../text';


const Mypage: Component = () => {
  useTitle($t.mypage);

  const createdAtStringAbsolute = createMemo(() => dayjs(session.user?.created_at).format('YYYY/MM/DD hh:mm:ss'));
  const createdAtStringRelative = createMemo(() => dayjs(session.user?.created_at).fromNow());

  return (
    <div class="vstack">
        <Show when={!session.user?.email}>
            <div class="alert bg-warn">
                <i class="icon fas fa-exclamation-triangle fa-fw" />
                メールアドレスおよびパスワードが登録されていません。<br/>
                <A href="/settings/account">登録する</A>
            </div>
        </Show>
        <div class="card">
            <div class="body">
                <p>アカウント作成日: {createdAtStringAbsolute()} ({createdAtStringRelative()})</p>
            </div>
        </div>
        <div>
            <h3>自分の投稿したつぶやき</h3>
            <ChannelView channel="myself" />
        </div>
    </div>
  );
};

export default Mypage;
