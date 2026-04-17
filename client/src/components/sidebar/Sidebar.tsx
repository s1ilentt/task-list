'use client';

import { SIDEBAR_MENU } from '@/shared/menu/sidebar';
import { Menu } from '../UI/menu/Menu';
import styles from './Sidebar.module.scss';
import { useProfile } from '@/hooks/user/useProfile';
import { SquareArrowRightExit } from 'lucide-react';
import { authService } from '@/services/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AUTH_PAGES } from '@/constants/pages-url';
import { Loader } from '../UI/loader/Loader';

export function Sidebar() {
	const { data: user, isLoading } = useProfile();

	const router = useRouter();

	const handleButton = async () => {
		try {
			await authService.logout();
			router.replace(AUTH_PAGES.LOGIN);
		} catch (error) {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message
				: error instanceof Error
					? error.message
					: 'Unknown error';

			console.log(message, 'error');
		}
	};

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				{isLoading ? (
					<Loader size={24} />
				) : (
					user && (
						<>
							<div className={styles['user-icon']}>
								<span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
							</div>
							<div className={styles['user-info']}>
								<div className={styles['user-name']}>{user.name || 'User'}</div>
								<div className={styles['user-email']}>{user.email}</div>
							</div>
							<button
								onClick={handleButton}
								className={styles['exit-button']}
							>
								<SquareArrowRightExit size={24} />
							</button>
						</>
					)
				)}
			</div>
			<div className={styles['sidebar-body-wrapper']}>
				<Menu
					menuItems={SIDEBAR_MENU}
					isMatch
				/>
			</div>
		</aside>
	);
}
