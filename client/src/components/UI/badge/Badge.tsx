import { ETaskPriority } from '@/types/task.interfaces';
import clsx from 'clsx';
import { CSSProperties, PropsWithChildren, ReactNode } from 'react';

interface IBadge {
	children: ReactNode;
	priority?: string;
	style?: CSSProperties;
	className?: string;
	viewKanban: boolean;
}

export function Badge({
	priority,
	children,
	style,
	className,
	viewKanban,
}: IBadge) {
	return (
		<span
			className={clsx(
				`rounded-lg w-max inline-block ${
					viewKanban
						? 'p-1.5 text-[13px]'
						: 'p-1.5 text-[13px] md:py-1.75 px-2 md:text-sm'
				}
				  font-semibold text-white transition leading-none`,
				{
					'bg-[#246fe0]': priority === 'low',
					'bg-[#eb8909]': priority === 'medium',
					'bg-[#d1453b]': priority === 'high',
					'bg-[#666]': !priority,
				},
				className,
			)}
			style={style}
		>
			{children}
		</span>
	);
}
