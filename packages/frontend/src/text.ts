export const $t = {
  hitorisskey: 'ひとりすきー',
  channels: 'チャンネル',
  home: 'ホーム',
  announcements: 'お知らせ',
  bottleMail: 'ボトルメール',
  settings: '設定',
  email: 'メールアドレス',
  password: 'パスワード',
  about: 'ひとりすきーについて',
  $welcome: {
    subTitle: 'なにかをつぶやきたい。けど、素性は知られたくない。',
    createNew: '新しくはじめる',
    login: 'ログイン',
    $createNew: {
      title: '注意！ひとりすきーを使うのははじめてですか？',
      description: 'すでに他の端末でひとりすきーをご利用の場合、メールアドレスとパスワードを登録していれば、そのアカウントを引き続きこの端末でご利用いただけます。',
      ok: 'それでも新規作成する',
      cancel: 'やっぱり戻る',
    },
    $login: {
      description1: '以前使用していたアカウントのメールアドレスとパスワードを入力してください。',
      description2: 'メールアドレスとパスワードをまだ登録していないのであれば、以前の端末にてひとりすきーにアクセスし、設定画面から登録してください。',
      ok: 'ログイン',
      cancel: 'やっぱり戻る',
    },
  },
  $channels: {
    public: 'みんなのつぶやき',
    private: 'プライベートルーム',
    realtime: 'なう！広場'
  },
  $channelDescriptions: {
    public: 'このチャンネルでのつぶやきは、誰かのつぶやきと一緒にランダムに表示されます。',
    private: 'このチャンネルでのつぶやきは、あなた以外に表示されません。誰にも見られたくないことを書き残しましょう。',
    realtime: 'このチャンネルには、24時間以内のリアルタイムなつぶやきを投稿できます。今起きていることについて、リアルタイムに会話しましょう。'
  },
  $postComposerView: {
    annotation: '注釈',
    hideContent: '投稿内容を伏せる',
    placeholder: '好きなことを書きましょう。',
    post: '投稿する',
    posting: '投稿中…',
  },
  $postView: {
    delete: '削除',
    changeVisibility: '公開範囲を変更…',
    report: 'このつぶやきを通報…',
  },
  $settings: {
    display: '表示設定',
    displayDescription: 'テーマ、アクセントカラー、文字サイズ',
    account: 'アカウント設定',
    accountDescription: 'メールアドレス、二要素認証',
    privacy: 'プライバシー設定',
    privacyDescription: 'ワードミュート',
    logout: 'ログアウト',
    logoutDisabled: 'アカウントにメールアドレスを登録していないため、ログアウトできません。',
    initialize: '初期値に戻す',
    $display: {
      theme: 'テーマ',
      $theme: {
        light: 'ライトテーマ',
        dark: 'ダークテーマ',
        system: 'システム設定に準ずる',
      },
      accentColor: 'アクセントカラー',
      fontSize: '文字サイズ',
    },
  },
} as const;