import { Component, createMemo, createSignal, For } from "solid-js";
import { css, styled } from "solid-styled-components";
import { api } from "../../api";
import { Post } from "../../api/models/post";
import { annotationTemplates } from "../../misc/annotationTemplates";

export type PostComposerView = {
  channel: string;
	onCreatePost?: (post: Post) => void;
};

const pcStyle = css`
	max-width: 640px;
	width: 100%;
`;

const Textarea = styled.textarea`
	height: 7em;
`;

export const PostComposerView: Component<PostComposerView> = (p) => {
  const [isEnableCw, setEnableCw] = createSignal(false);
	const [content, setContent] = createSignal('');
	const [annotation, setAnnotation] = createSignal('');
	const lengthRemaining = createMemo(() => 1024 - content().length);
	const canPost = createMemo(() => (!isEnableCw() || annotation().length > 0) && content().length > 0 && content().length <= 1024);
	const [isProcessing, setProcessing] = createSignal(false);

	const post = () => {
		setProcessing(true);
		api.post.createAsync({
			channel: p.channel,
			content: content(),
			annotation: isEnableCw() ? annotation() : undefined,
		}).then((post) => {
			setContent('');
			if (!isEnableCw()) {
				setAnnotation('');
			}
			if (p.onCreatePost) p.onCreatePost(post);
		}).catch(e => {
			alert(e);
		}).finally(() => {
			setProcessing(false);
		});
	};

  return (
    <div class={`card pa-2 fix-bottom-right-3 shadow-2 ${pcStyle}`}>
				{isEnableCw() ? (
					<div class="hstack dense">
						<button class="btn flat pa-1 mr-1" onClick={() => setEnableCw(false)} disabled={isProcessing()}><i class="fas fa-times"/></button>
						<input type="text" list="cwTemplates" class="input-field" placeholder="注釈" disabled={isProcessing()} value={annotation()} onInput={e => setAnnotation(e.currentTarget.value)} />
            <datalist id="cwTemplates">
							<For each={annotationTemplates} children={c => <option value={c} />} />
            </datalist>
					</div>
				) : (
					<button class="btn flat text-left px-1 text-dimmed" onClick={() => setEnableCw(true)} disabled={isProcessing()}>
						<i class="fas fa-eye-slash"/> 投稿内容を伏せる
					</button>
				)}
				<Textarea class="input-field mt-1" placeholder="好きなことを書きましょう。" disabled={isProcessing()} value={content()} onInput={e => setContent(e.currentTarget.value)} />
				<div class="hstack dense f-right f-middle mt-1">
					<div class="text-bold mr-1 text-75">{lengthRemaining()}</div>
					<button class="btn primary" disabled={!canPost() || isProcessing()} onClick={post}>
            {isProcessing() ? '投稿中…' : '投稿する'}
					</button>
				</div>
    </div>
  );
};
