'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ViewSwitcher } from './view-switcher/ViewSwitcher';
import { TasksList } from '../tasks-list/TasksList';
import { Loader } from '@/components/UI/loader/Loader';
import { TasksKanban } from '../tasks-kanban/TasksKanban';

export type TView = 'list' | 'kanban';

export function TaskDisplay() {
	const [type, setType, isLoading] = useLocalStorage<TView>({
		key: 'view-type',
		defaultValue: 'list',
	});

	if (isLoading) return <Loader size={24} />;

	return (
		<>
			<ViewSwitcher
				currentType={type}
				setType={setType}
			/>
			{type === 'list' ? <TasksList /> : <TasksKanban />}
		</>
	);
}
