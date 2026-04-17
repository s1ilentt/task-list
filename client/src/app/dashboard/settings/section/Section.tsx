'use client';

import { useProfile } from '@/hooks/user/useProfile';
import styles from './Section.module.scss';
import { Loader } from '@/components/UI/loader/Loader';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TProfileFormField, TUserForm } from '@/types/auth.interfaces';
import { FORM_FIELDS_PROFILE } from '@/shared/settings-input';
import { useEffect } from 'react';
import { SettingsInput } from '@/components/UI/settings-input/SettingsInput';
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';
import { LoaderCircle as LoaderCircleIcon } from 'lucide-react';

export function Section() {
	const { data: profile, isLoading } = useProfile();
	const { updateProfile, isUpdating } = useUpdateProfile();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TUserForm>({ mode: 'onSubmit' });

	const onSubmit: SubmitHandler<TUserForm> = formData => {
		updateProfile(formData);
	};

	useEffect(() => {
		if (profile) {
			reset({
				name: profile.name,
				email: profile.email,
				password: '',
				workInterval: profile.workInterval,
				breakInterval: profile.breakInterval,
				intervalsCount: profile.intervalsCount,
			});
		}
	}, [reset, profile]);

	if (isLoading)
		return (
			<div className='flex items-center justify-center h-[80vh]'>
				<Loader />
			</div>
		);

	return (
		<section className={styles.section}>
			{profile ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}
				>
					<div className={styles['inputs-list']}>
						{FORM_FIELDS_PROFILE.map(field => {
							const error = errors[field.name as keyof TUserForm]?.message;

							return (
								<div key={field.name}>
									<SettingsInput
										name={field.name as TProfileFormField}
										type={field.type}
										label={field.label}
										register={register}
									/>
									{error && <div className={styles.errorText}>{error}</div>}
								</div>
							);
						})}
					</div>
					<button
						type='submit'
						className={styles.button}
						disabled={isUpdating}
					>
						{isUpdating ? (
							<LoaderCircleIcon
								size={20}
								className={styles['circle-icon']}
							/>
						) : (
							<span>Save</span>
						)}
					</button>
				</form>
			) : (
				<h1>Profile date not defined</h1>
			)}
		</section>
	);
}
