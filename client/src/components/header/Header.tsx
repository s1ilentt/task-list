'use client';

import { PropsWithChildren } from 'react';
import { Columns2 } from 'lucide-react';
import { useMenu } from '@/hooks/useMenu';

export function Header({ children }: PropsWithChildren) {
	const { toogleMenu } = useMenu();

	return (
		<h1
			className='relative text-[24px] text-center py-3 border-solid border-b border-border
			  min-[768px]:border-b-2 min-[768px]:text-[32px] min-[1700px]:text-[42px] min-[1700px]:py-4'
		>
			<Columns2
				className='absolute left-0 top-1 lg:hidden z-20'
				onClick={toogleMenu}
				color={'#b5b5b5'}
				size={26}
			/>
			{children}
		</h1>
	);
}
