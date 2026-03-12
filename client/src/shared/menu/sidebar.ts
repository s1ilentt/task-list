import { DASHBOARD_PAGES } from '@/constants/pages-url';
import { IMenuItem } from '@/types/menu.interface';

export const SIDEBAR_MENU: IMenuItem[] = [
	{
		href: DASHBOARD_PAGES.HOME,
		name: 'Dashboard',
	},
	{
		href: DASHBOARD_PAGES.TASKS,
		name: 'Tasks',
	},
	{
		href: DASHBOARD_PAGES.TASKS,
		name: 'Tasks',
	},
	{
		href: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro',
	},
	{
		href: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Time Blocking',
	},
	{
		href: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
	},
];
