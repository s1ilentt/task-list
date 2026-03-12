import { PropsWithChildren } from 'react';

export function Header({ children }: PropsWithChildren) {
	return (
		<h1 className='text-4xl text-center py-5 border-solid border-b-2 border-border'>
			{children}
		</h1>
	);
}
