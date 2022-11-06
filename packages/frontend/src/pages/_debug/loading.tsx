import { Component } from "solid-js";
import { LoadingView } from "../../components/views/primitives/LoadingView";
import { IS_DEVELOPMENT } from "../../global-const";
import { useTitle } from "../../hooks/use-title";
import NotFound from "../[...all]";

const DebugLoading: Component = () => {
  if (!IS_DEVELOPMENT) return <NotFound />

  useTitle([{
    label: 'Debug',
    link: '/_debug',
  }, 'LoadingView']);

  return (
    <LoadingView />
  );
};

export default DebugLoading;
