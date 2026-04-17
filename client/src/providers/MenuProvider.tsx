'use client';

import { createContext, PropsWithChildren, useMemo, useState } from 'react';

export interface IMenuContext {
	isActiveMenu: boolean;
	hideMenu: () => void;
	toogleMenu: () => void;
}

export const MenuContext = createContext<IMenuContext | undefined>(undefined);

export function MenuProvider({ children }: PropsWithChildren) {
	const [isActiveMenu, setIsActiveMenu] = useState(false);

	const hideMenu = () => {
		setIsActiveMenu(false);
	};
	const toogleMenu = () => {
		setIsActiveMenu(prev => !prev);
	};

	const value = useMemo(
		() => ({
			isActiveMenu,
			hideMenu,
			toogleMenu,
		}),
		[isActiveMenu, hideMenu, toogleMenu],
	);

	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
