import clsx from 'clsx';
import styles from './Checkbox.module.scss';

interface ICheckbox {
	checked: boolean;
	onChange: (value: boolean) => void;
	viewKanban?: boolean;
}

export function Checkbox({ checked, onChange, viewKanban = false }: ICheckbox) {
	return (
		<label
			className={clsx(
				styles.container,
				viewKanban && styles['containter_kanban'],
			)}
		>
			<input
				type='checkbox'
				checked={checked}
				onChange={e => onChange(e.target.checked)}
				className={styles.realCheckbox}
			/>
			<span
				className={clsx(
					styles.customCheckbox,
					viewKanban && styles['customCheckbox_kanban'],
				)}
			/>
		</label>
	);
}
