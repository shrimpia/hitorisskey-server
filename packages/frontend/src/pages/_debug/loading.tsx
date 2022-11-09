import { Component } from 'solid-js';
import { ShowWhenDev } from '../../components/util/ShowWhenDev';
import { LoadingView } from '../../components/views/primitives/LoadingView';
import { useTitle } from '../../hooks/use-title';

const DebugLoading: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'LoadingView']);

  return (
    <ShowWhenDev>
      <LoadingView />
    </ShowWhenDev>
  );
};

export default DebugLoading;
