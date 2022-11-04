import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { LoadingView } from "../../components/views/primitives/LoadingView";
import { useTitle } from "../../hooks/use-title";

const BetaFeedback: Component = () => {
  const FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSff4QLsrfF2_CAMt35cPkWADP_hNpJfQaip4oqBX6d7ddGg1Q/viewform';

const StyledFrame = styled.iframe`
    width: 100%;
    height: 2000px;
    border: none;
  `;

  useTitle('フィードバック');

  return (
    <>
      <p>何かありましたら、こちらのフォームからフィードバックをご記入ください。<br/>ひとりすきーの開発に役立てられます。</p>
      <p>正常に表示されませんか？<a href={FORMS_URL} target="_blank" rel="noreferrer noopener">別のタブで開く</a></p>
      <StyledFrame src={FORMS_URL + '?embedded=true'}>
        <LoadingView />
      </StyledFrame>
    </>
  );
};

export default BetaFeedback;
