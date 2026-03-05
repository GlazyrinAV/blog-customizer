import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text weight={800} uppercase size={31}>
						<>Задайте параметры</>
					</Text>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
