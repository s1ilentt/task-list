import {
	type TUserForm,
	type TProfileFormField,
} from '@/types/auth.interfaces';
import { RegisterOptions } from 'react-hook-form';

export const getSettingsInputForUser = <TField extends TProfileFormField>(
	type: TField,
): RegisterOptions<TUserForm, TField> => {
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
	} else if (type === 'breakInterval' || type === 'workInterval') {
		return {
			required: 'This field is required',
			min: {
				value: 1,
				message: 'Minimum value is 1',
			},
			max: {
				value: 100,
				message: 'Maximum value is 100',
			},
			valueAsNumber: true,
		};
	} else if (type === 'intervalsCount') {
		return {
			required: 'This field is required',
			min: {
				value: 1,
				message: 'Minimum value is 1',
			},
			max: {
				value: 10,
				message: 'Maximum value is 10',
			},
			valueAsNumber: true,
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
