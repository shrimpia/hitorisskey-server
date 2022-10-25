import { Component } from 'solid-js';
import { keyframes, styled } from 'solid-styled-components';

const DURATION = 1.5;
const DELAY = 0.07;
const DEFAULT_SIZE = '64px';
const DEFAULT_COLOR = 'var(--primary)';

export type LoadingViewProp = {
  size?: string | number,
  color?: string,
};

type WrapperProp = {
  size?: string,
};

const Wrapper = styled.div<WrapperProp>`
	position: relative;
	width: ${props => props.size ?? DEFAULT_SIZE};
	height: ${props => props.size ?? DEFAULT_SIZE};
`;

type BaseProp = WrapperProp & {
  color?: string,
};

const Base = styled.div<BaseProp>`
	position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: ${props => props.size ?? DEFAULT_SIZE};
  height: ${props => props.size ?? DEFAULT_SIZE};
  background-color: none;
  border: 3px solid ${props => props.color ?? DEFAULT_COLOR};
  opacity: 0;
  translate: scale(0);
  border-radius: 100%;
`;

const scaleOut = keyframes`
	0% { 
		transform: scale(0);
		opacity: 1;
	}
	90% {
		transform: scale(1.0);
		opacity: 0;
	}
`;

const Part1 = styled(Base)`
  animation: ${scaleOut} ${DURATION}s infinite ease-out;
`;
const Part2 = styled(Base)`
  animation: ${scaleOut} ${DURATION}s infinite ease-out calc(${DELAY}s * 2);
`;
const Part3 = styled(Base)`
  animation: ${scaleOut} ${DURATION}s infinite ease-out calc(${DELAY}s * 4);
`;

export const LoadingView: Component<LoadingViewProp> = (p) => {
  const size = !p.size ? undefined : typeof p.size === 'string' ? p.size : p.size + 'px';
  return (
    <Wrapper size={size}>
      <Part1 size={size} color={p.color}/>
      <Part2 size={size} color={p.color}/>
      <Part3 size={size} color={p.color}/>
    </Wrapper>
  );
};
