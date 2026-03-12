import { IMenuItem } from '@/types/menu.interface';
import styles from './MenuItem.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export function MenuItem({ href, name, isActive }: IMenuItem) {
	return (
		<li>
			<Link
				className={clsx(styles.link, isActive && styles.active)}
				href={href}
			>
				{name}
			</Link>
		</li>
	);
}
