import { ITask } from '@/types/task.interfaces';
import { useMemo } from 'react';

export function useTasksByDate(tasks: ITask[] | undefined) {
	const tasksByDate = useMemo(() => {
		if (!tasks || tasks.length === 0) return {};

		return tasks.reduce(
			(acc, task) => {
				const dateKey = task.dueDate;

				if (!acc[dateKey]) {
					acc[dateKey] = [];
				}

				acc[dateKey].push(task);
				return acc;
			},
			{} as Record<string, ITask[]>,
		);
	}, [tasks]);

	return tasksByDate;
}
