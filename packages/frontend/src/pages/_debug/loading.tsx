import { Component } from "solid-js";
import { LoadingView } from "../../components/views/primitives/loading-view";
import { useTitle } from "../../hooks/use-title";

const DebugLoading: Component = () => {
  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'LoadingView']);

  return (
    <LoadingView />
  );
};

export default DebugLoading;
