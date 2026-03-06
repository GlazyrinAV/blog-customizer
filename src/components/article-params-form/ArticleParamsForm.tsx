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
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleopenClick = () => {
		setIsOpen(!isOpen);
	};

	const handleFontSelection = (option: OptionType) => {
		setFont(option);
	};

	const handleFontSizeSelection = (option: OptionType) => {
		setFontSize(option);
	};

	const handleFontColorSelection = (option: OptionType) => {
		setFontColor(option);
	};

	const handleBackgroundColorSelection = (option: OptionType) => {
		setBackgroundColor(option);
	};

	const handleContentWidthSelection = (option: OptionType) => {
		setContentWidth(option);
	};

	const handleApply = () => {
		props.onApply({
			fontFamily: font,
			fontSize: fontSize,
			fontColor: fontColor,
			contentWidth: contentWidth,
			backgroundColor: backgroundColor,
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
						selected={font}
						onChange={handleFontSelection}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name='FontSizeSelector'
						selected={fontSize}
						onChange={handleFontSizeSelection}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={handleFontColorSelection}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={handleBackgroundColorSelection}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
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
