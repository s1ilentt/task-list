'use client';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './MobileMenu.module.scss';
import { createPortal } from 'react-dom';
import { Menu } from '../UI/menu/Menu';
import { MOBILE_MENU } from '@/shared/menu/mobile-menu';
import { useMenu } from '@/hooks/useMenu';
import clsx from 'clsx';

export function MobileMenu() {
	const menuRef = useRef<HTMLDivElement>(null);

	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
		null,
	);

	const { isActiveMenu, hideMenu } = useMenu();

	const handleClickOutsideMenuBody = () => {
		hideMenu();
	};

	useEffect(() => {
		setPortalContainer(document.body);
	}, []);

	useEffect(() => {
		if (isActiveMenu) {
			document.body.classList.add('scroll-lock');
		} else if (!isActiveMenu) {
			document.body.classList.remove('scroll-lock');
		}
	}, [isActiveMenu]);

	if (!portalContainer) {
		return null;
	}

	return createPortal(
		<div
			ref={menuRef}
			className={clsx(styles.menu, isActiveMenu && styles.menuActive)}
			onClick={handleClickOutsideMenuBody}
		>
			<div
				className={styles.menuBody}
				onClick={(e: MouseEvent) => e.stopPropagation()}
			>
				<Menu
					className={styles.menuList}
					menuItems={MOBILE_MENU}
					isMatch
					hideFunction={hideMenu}
				/>
			</div>
		</div>,
		portalContainer,
	);
}
