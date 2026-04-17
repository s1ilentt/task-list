import { IMenuItem } from '@/types/menu.interface';
import styles from './MenuItem.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export function MenuItem({
	href,
	name,
	isActive,
	icon: Icon,
	hideFunction,
}: IMenuItem) {
	return (
		<li>
			<Link
				className={clsx(styles.link, isActive && styles.active)}
				{...(hideFunction && { onClick: hideFunction })}
				href={href}
			>
				{Icon && <Icon size={24} />}
				<span>{name}</span>
			</Link>
		</li>
	);
}
