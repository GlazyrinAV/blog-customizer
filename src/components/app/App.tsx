import { CSSProperties, useState, useRef } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import { OptionType, defaultArticleState } from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

export type ArticleFormProps = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

export const App = () => {
	const mainRef = useRef<HTMLDivElement | null>(null);

	const [currentArticleState, setCurrentArticleState] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	const handleApply = (options: ArticleFormProps) => {
		setCurrentArticleState(options);
	};

	const handleReset = () => {
		setCurrentArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});
	};

	return (
		<main
			ref={mainRef}
			className={styles.main}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				currentArticleState={currentArticleState}
			/>
			<Article />
		</main>
	);
};
