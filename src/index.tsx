import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useState,
	useLayoutEffect,
	useRef,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type ArticleFormProps = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

const App = () => {
	const mainRef = useRef<HTMLDivElement | null>(null);
	const [state, setState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	const handleApply = (options: ArticleFormProps) => {
		setState(options);
	};

	const handleReset = () => {
		setState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});
	};

	useLayoutEffect(() => {
		if (mainRef.current) {
			mainRef.current.style.setProperty(
				'--font-family',
				state.fontFamily.value
			);
		}
	}, [state]);

	return (
		<main
			ref={mainRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamily.value,
					'--font-size': state.fontSize.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
