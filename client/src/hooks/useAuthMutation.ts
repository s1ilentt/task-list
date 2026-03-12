import { DASHBOARD_PAGES } from '@/constants/pages-url';
import { authService } from '@/services/auth';
import { IAuthForm, TAuthMode } from '@/types/auth.interfaces';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

export function useAuthMutation(
	mode: TAuthMode,
	setErrorForm?: UseFormSetError<IAuthForm>,
	setServerError?: Dispatch<SetStateAction<string | null>>,
) {
	const router = useRouter();

	const mutation = useMutation({
		mutationKey: ['auth', mode],
		mutationFn: (data: IAuthForm) => authService.logAndReg(mode, data),
		onSuccess() {
			toast.success(
				mode === 'login'
					? 'You have successfully logged in'
					: 'Registration successful',
			);
			router.replace(DASHBOARD_PAGES.HOME);
		},
		onError(error: unknown) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || error.message;

				if (setErrorForm && message) {
					setErrorForm('email', { type: 'server', message });
				}
				if (setServerError && message) {
					setServerError(message);
				}
			} else if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log('Unknown error', error);
			}
		},
	});

	return mutation;
}
