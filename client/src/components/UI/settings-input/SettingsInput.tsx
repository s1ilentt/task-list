import { UseFormRegister } from 'react-hook-form';
import styles from './SettingsInput.module.scss';
import { TUserForm, type TProfileFormField } from '@/types/auth.interfaces';
import { getSettingsInputForUser } from '@/utils/get-settings-input-for-user';

interface ISettingInputProps {
	name: TProfileFormField;
	label: string;
	type: string;
	register: UseFormRegister<TUserForm>;
}

export function SettingsInput({
	name,
	label,
	type,
	register,
}: ISettingInputProps) {
	const settingsInput = getSettingsInputForUser(name);

	return (
		<div>
			<label
				htmlFor={name}
				className={styles.label}
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				placeholder={`Enter ${label}`}
				className={styles.input}
				{...register(name, settingsInput)}
				onWheel={e => (e.target as HTMLInputElement).blur()}
			/>
		</div>
	);
}
