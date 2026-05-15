import { DASHBOARD_PAGES } from '@/constants/pages-url';
import { IMenuItem } from '@/types/menu.interface';
import {
	AlarmClock,
	ChartSpline,
	ClipboardList,
	Settings,
	TableProperties,
} from 'lucide-react';

export const SIDEBAR_MENU: IMenuItem[] = [
	{
		href: DASHBOARD_PAGES.HOME,
		name: 'Dashboard',
		icon: ChartSpline,
	},
	{
		href: DASHBOARD_PAGES.TASKS,
		name: 'Tasks',
		icon: ClipboardList,
	},
	{
		href: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro',
		icon: AlarmClock,
	},
	{
		href: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
		icon: Settings,
	},
];
