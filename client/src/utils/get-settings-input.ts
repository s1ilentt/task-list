import { IAuthForm, type TAuthFormField } from '@/types/auth.interfaces';
import { RegisterOptions } from 'react-hook-form';

export const getSettingsInput = <TField extends TAuthFormField>(
	type: TField,
): RegisterOptions<IAuthForm, TField> => {
	if (type === 'email') {
		return {
			required: 'This field is required',
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
				message: 'Please enter a valid email address',
			},
		};
	} else if (type === 'password') {
		return {
			required: 'This field is required',
			minLength: {
				value: 6,
				message: 'Password must be at least 6 characters long',
			},
		};
	}

	return {
		required: 'This field is required',
		minLength: {
			value: 3,
			message: 'Name must be at least 3 characters long',
		},
	};
};
