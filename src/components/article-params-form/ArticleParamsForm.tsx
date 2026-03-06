import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleFormProps } from 'src/index';

type ArticleParamsFormProps = {
	onApply: (options: ArticleFormProps) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [state, setState] = useState<ArticleFormProps>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleopenClick = () => {
		setIsOpen(!isOpen);
	};

	const handleFontSelection = (option: OptionType) => {
		setState({
			...state,
			fontFamily: option,
		});
	};

	const handleFontSizeSelection = (option: OptionType) => {
		setState({
			...state,
			fontSize: option,
		});
	};

	const handleFontColorSelection = (option: OptionType) => {
		setState({
			...state,
			fontColor: option,
		});
	};

	const handleBackgroundColorSelection = (option: OptionType) => {
		setState({
			...state,
			backgroundColor: option,
		});
	};

	const handleContentWidthSelection = (option: OptionType) => {
		setState({
			...state,
			contentWidth: option,
		});
	};

	const handleApply = () => {
		props.onApply({
			fontFamily: state.fontFamily,
			fontSize: state.fontSize,
			fontColor: state.fontColor,
			contentWidth: state.contentWidth,
			backgroundColor: state.backgroundColor,
		});
		setIsOpen(false);
	};

	const handleReset = () => {
		props.onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleopenClick} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text weight={800} uppercase size={31}>
						<>Задайте параметры</>
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={state.fontFamily}
						onChange={handleFontSelection}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name='FontSizeSelector'
						selected={state.fontSize}
						onChange={handleFontSizeSelection}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={state.fontColor}
						onChange={handleFontColorSelection}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={handleBackgroundColorSelection}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={handleContentWidthSelection}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
