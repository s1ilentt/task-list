import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { MenuProvider } from '@/providers/MenuProvider';
import { TaskAddProvider } from '@/providers/TaskAddProvider';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<TaskAddProvider>
			<MenuProvider>
				<Sidebar />
				<MobileMenu />
				<main
					className='pt-1 px-3 min-[768px]:px-5 min-[768px]:pt-3 min-[1024px]:pl-62.5 
					  min-[1024px]:pr-7.5 min-[1700px]:pl-77.5'
				>
					{children}
				</main>
			</MenuProvider>
		</TaskAddProvider>
	);
}
