import { SIDEBAR_MENU } from '@/shared/menu/sidebar';
import { Menu } from '../menu/Menu';
import styles from './Sidebar.module.scss';

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}></div>
			<div className={styles['sidebar-body-wrapper']}>
				<button></button>
				<Menu
					menuItems={SIDEBAR_MENU}
					isMatch
				/>
			</div>
		</aside>
	);
}
