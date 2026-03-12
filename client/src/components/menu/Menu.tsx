'use client';

import { match } from 'path-to-regexp';
import styles from './Menu.module.scss';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { IMenuItem } from '@/types/menu.interface';
import { MenuItem } from './menu-item/MenuItem';

interface IMenu {
	menuItems: IMenuItem[];
	className?: string;
	isMatch?: boolean;
}

export function Menu({ menuItems, className, isMatch = false }: IMenu) {
	const pathname = usePathname();

	return (
		<nav>
			<ul className={clsx(styles.menuList, className)}>
				{menuItems.map((menuItem, index) => (
					<MenuItem
						key={`${menuItem.href}-${index}`}
						href={menuItem.href}
						name={menuItem.name}
						isActive={
							isMatch ? !!match(menuItem.href as string)(pathname) : false
						}
					/>
				))}
			</ul>
		</nav>
	);
}
