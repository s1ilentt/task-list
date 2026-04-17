import { UseFormRegister } from 'react-hook-form';
import styles from './TransperentInput.module.scss';
import { TTaskFormState } from '@/types/task.interfaces';
import clsx from 'clsx';

interface ITransperentInput {
	register: UseFormRegister<TTaskFormState>;
	fieldName: keyof TTaskFormState;
	className: string;
	disabled?: boolean;
	viewKanban?: boolean;
}

export function TransperentInput({
	register,
	fieldName,
	className,
	disabled = false,
	viewKanban = false,
}: ITransperentInput) {
	return (
		<input
			className={clsx(styles.input, className, viewKanban && styles.kanban)}
			disabled={disabled}
			type='text'
			{...register(fieldName)}
		/>
	);
}
