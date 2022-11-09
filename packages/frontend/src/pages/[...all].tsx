import { Component } from 'solid-js';
import { styled } from 'solid-styled-components';

import { useTitle } from '../hooks/use-title';
import { PostView } from '../components/views/PostView';
import { Post } from '../api/models/post';

const NotFound: Component = () => {
  useTitle('Not Found');

  const fakePost: Post = {
    id: '',
    channel: '',
    annotation: null,
    content: '残念ながら、存在しないページに来てしまったみたいです。\n\nリンク切れや、URLの入力ミスがないか確認してみてください。',
    isMine: false,
    reactions: [{
      emoji: '😭',
      isMine: false,
    }, {
      emoji: '😭',
      isMine: true,
    }, {
      emoji: '😭',
      isMine: false,
    }, {
      emoji: '🤯',
      isMine: false,
    }],
  };

  const Wrapper = styled.div`
    transform-origin: center center;
    transform: rotate(2deg);
    margin-top: 32px;
  `;

  return (
    <Wrapper class="shadow-2">
      <PostView post={fakePost}/>
    </Wrapper>
  );
};

export default NotFound;
