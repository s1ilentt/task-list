'use client';

import styles from './AuthForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthForm, TAuthMode } from '@/types/auth.interfaces';
import Link from 'next/link';
import { AUTH_PAGES } from '@/constants/pages-url';
import { Input } from '@/components/UI/input/Input';
import { useAuthMutation } from '@/hooks/useAuthMutation';
import { LoaderCircle as LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AuthForm({ mode }: { mode: TAuthMode }) {
	const { register, handleSubmit, formState, setError } = useForm<IAuthForm>({
		mode: 'onChange',
	});

	const [serverError, setServerError] = useState<string | null>(null);

	const { mutate, isPending } = useAuthMutation(mode, setError, setServerError);

	const isRegistration = mode === 'register';

	const emailError =
		formState.errors.email?.message || (isPending && serverError);
	const passwordError = formState.errors.password?.message;
	const nameError = formState.errors.name?.message;

	const onSumbit: SubmitHandler<IAuthForm> = formData => {
		mutate(formData);
	};

	useEffect(() => {
		if (
			serverError &&
			!isPending &&
			formState.errors.email?.type !== 'server'
		) {
			setServerError(null);
		}
	}, [formState.errors.email?.message, isPending]);

	return (
		<div className={styles.authSection}>
			<h1 className={styles.heading}>
				{isRegistration ? 'Registration' : 'Login'}
			</h1>
			<form
				onSubmit={handleSubmit(onSumbit)}
				className={styles.form}
			>
				<div>
					{emailError && <div className={styles.errorText}>{emailError}</div>}
					<Input
						type='email'
						register={register}
					/>
				</div>
				{isRegistration && (
					<div>
						{nameError && <div className={styles.errorText}>{nameError}</div>}
						<Input
							type='name'
							register={register}
						/>
					</div>
				)}
				<div>
					{passwordError && (
						<div className={styles.errorText}>{passwordError}</div>
					)}
					<Input
						type='password'
						register={register}
					/>
				</div>
				<button
					className={styles.button}
					disabled={isPending}
					type='submit'
				>
					{isRegistration ? 'Registration' : 'Login'}
					{isPending && <LoaderCircleIcon className={styles.iconLoader} />}
				</button>
			</form>
			{isRegistration ? (
				<div className={styles.linkText}>
					<span>Already have an account? </span>
					<Link href={AUTH_PAGES.LOGIN}>Log in</Link>
				</div>
			) : (
				<div className={styles.linkText}>
					<span>Don't have an account yet? </span>
					<Link href={AUTH_PAGES.REGISTRATION}>Register</Link>
				</div>
			)}
		</div>
	);
}
