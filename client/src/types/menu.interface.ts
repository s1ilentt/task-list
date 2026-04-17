import { LucideIcon } from 'lucide-react';

export interface IMenuItem {
	href: string;
	name: string;
	isActive?: boolean;
	icon?: LucideIcon;
	hideFunction?: () => void;
}
