import { Header } from '@/components/header/Header';
import { Section } from './section/Section';
import { Metadata } from 'next';
import { NO_INDEX_PAGE } from '@/constants/seo';

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE,
};

export default function SettingsPage() {
	return (
		<div className='min-h-[calc(100vh-4px)] md:min-h-[calc(100vh-12px)]'>
			<Header>Settings</Header>
			<Section />
		</div>
	);
}
