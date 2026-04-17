import { Header } from '@/components/header/Header';
import { TaskDisplay } from './task-display/TaskDisplay';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tasks',
	description:
		'A task list for comfortable scheduling for different days in the form of a kanban and list',
};

export default function TaskPage() {
	return (
		<div>
			<Header>Tasks</Header>
			<TaskDisplay />
		</div>
	);
}
