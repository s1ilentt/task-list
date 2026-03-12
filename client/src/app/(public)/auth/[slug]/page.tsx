import type { TAuthMode } from '@/types/auth.interfaces';
import { AuthForm } from './form/AuthForm';
import type { Metadata } from 'next';
import { NO_INDEX_PAGE } from '@/constants/seo';

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE,
};

export default async function AuthPage({
	params,
}: {
	params: Promise<{ slug: TAuthMode }>;
}) {
	const { slug: modeAuth } = await params;

	return (
		<main className='h-screen flex justify-center items-center px-3'>
			<AuthForm mode={modeAuth} />
		</main>
	);
}
