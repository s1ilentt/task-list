import clsx from 'clsx';
import styles from './Button.module.scss';

interface IButton {
	children: React.ReactNode;
	filled?: boolean;
	clickHandler: () => void;
}

export function Button({ filled = false, children, clickHandler }: IButton) {
	return (
		<button
			onClick={clickHandler}
			className={clsx(styles.button, filled && styles.filled)}
		>
			{children}
		</button>
	);
}
