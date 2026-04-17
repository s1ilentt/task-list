import { Header } from '@/components/header/Header';
import { Statistics } from './statistics/Statistics';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Your account statistics collected over time',
};

export default function HomePage() {
	return (
		<div>
			<Header>Dashboard</Header>
			<Statistics />
		</div>
	);
}
