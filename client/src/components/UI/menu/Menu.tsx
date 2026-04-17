'use client';

import { match } from 'path-to-regexp';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { IMenuItem } from '@/types/menu.interface';
import { MenuItem } from './menu-item/MenuItem';

interface IMenu {
	menuItems: IMenuItem[];
	className?: string;
	isMatch?: boolean;
	hideFunction?: () => void;
}

export function Menu({
	menuItems,
	className,
	isMatch = false,
	hideFunction,
}: IMenu) {
	const pathname = usePathname();

	return (
		<nav>
			<ul className={clsx(className)}>
				{menuItems.map((menuItem, index) => (
					<MenuItem
						key={`${menuItem.href}-${index}`}
						href={menuItem.href}
						name={menuItem.name}
						isActive={
							isMatch ? !!match(menuItem.href as string)(pathname) : false
						}
						icon={menuItem.icon}
						hideFunction={hideFunction}
					/>
				))}
			</ul>
		</nav>
	);
}
