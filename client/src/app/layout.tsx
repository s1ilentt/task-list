import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { SITE_NAME } from '@/constants/seo';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from 'sonner';

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	style: ['normal'],
	fallback: ['sans-serif'],
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description:
		'Organize your tasks and to-do lists easily with the simple and convenient Task List app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.variable} antialiased`}>
				<QueryProvider>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</QueryProvider>
			</body>
		</html>
	);
}
