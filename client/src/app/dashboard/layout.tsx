import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Sidebar />
			<main className='pt-4 pr-10 pl-80'>{children}</main>
		</>
	);
}
