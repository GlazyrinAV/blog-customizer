import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickCloseOrEsc = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (isOpen) {
				const { target } = event;
				if (target instanceof Node && !rootRef.current?.contains(target)) {
					onClose?.();
					onChange?.(false);
				}
			} else {
				return;
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Escape') {
				onClose?.();
				onChange?.(false);
			} else {
				return;
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
			window.addEventListener('keydown', handleKeyDown);
		} else {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose, onChange, isOpen]);
};
