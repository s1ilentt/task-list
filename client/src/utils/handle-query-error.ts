import { MutationMeta } from '@tanstack/react-query';
import axios from 'axios';

export const handleGlobalError = (error: Error, meta?: MutationMeta) => {
	if (meta?.ignoreGlobalError) {
		return;
	}
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.message || error.message;
		console.log(message, 'error');
	} else {
		console.log(error.message, 'error');
	}
};
