import { Header } from '@/components/header/Header';
import { PomodoroTimer } from './pomodoro-timer/PomodoroTimer';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Timer',
	description:
		'Convenient pomodoro timer for proper distribution of working time and rest time',
};

export default function TimerPage() {
	return (
		<div className='min-h-[calc(100vh-4px)] md:min-h-[calc(100vh-12px)] flex flex-col'>
			<Header>Pomodoro</Header>
			<PomodoroTimer />
		</div>
	);
}
