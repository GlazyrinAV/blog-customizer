import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleFormProps } from 'src/components/app/App';
import { useOutsideClickCloseOrEsc } from '../hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (options: ArticleFormProps) => void;
	onReset: () => void;
	currentArticleState: ArticleFormProps;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleFormProps>(props.currentArticleState);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleOpenClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setCurrentArticleState({ ...currentArticleState, [field]: value });
		};
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		props.onApply(currentArticleState);
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		props.onReset();
	};

	useOutsideClickCloseOrEsc({
		isOpen: isFormOpen,
		rootRef: containerRef,
		onChange: setIsFormOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleOpenClick} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text weight={800} uppercase size={31}>
						<>Задайте параметры</>
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={currentArticleState.fontFamilyOption}
						onChange={updateFormField('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name='FontSizeSelector'
						selected={currentArticleState.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentArticleState.fontColor}
						onChange={updateFormField('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentArticleState.backgroundColor}
						onChange={updateFormField('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentArticleState.contentWidth}
						onChange={updateFormField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
