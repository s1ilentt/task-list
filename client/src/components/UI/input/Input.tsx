import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import { IAuthForm, type TAuthFormField } from '@/types/auth.interfaces';
import { getSettingsInput } from '@/utils/get-settings-input';

interface IInputProps {
	type: TAuthFormField;
	register: UseFormRegister<IAuthForm>;
}

export function Input({ type, register }: IInputProps) {
	const settingsInput = getSettingsInput(type);

	return (
		<div className={styles.emailInputWrapper}>
			<label
				htmlFor={type}
				className={styles.labelIput}
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}:
			</label>
			<input
				type={type === 'name' ? 'text' : type}
				id={type}
				placeholder={`Enter you ${type}`}
				className={styles.input}
				{...register(type, settingsInput)}
			/>
		</div>
	);
}
