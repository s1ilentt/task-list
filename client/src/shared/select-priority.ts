import { IOptions } from '@/components/UI/single-select/SingleSelect';

export const PRIORITY_SELECT: IOptions[] = ['high', 'medium', 'low'].map(
	item => {
		return {
			label: item,
			value: item,
		};
	},
);
