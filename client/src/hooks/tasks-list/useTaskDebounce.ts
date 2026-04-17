import { TTaskFormState } from '@/types/task.interfaces';
import { UseFormWatch } from 'react-hook-form';
import { useCreateTask } from './useCreateTask';
import { useUpdateTask } from './useUpdateTask';
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useTaskContext } from '../useTaskContext';

interface IUseTaskDebounce {
	watch: UseFormWatch<TTaskFormState>;
	taskId: string;
}

export function useTaskDebounce({ watch, taskId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	const { setIdActiveDayColumn } = useTaskContext();

	const debounceCreateTask = useCallback(
		debounce((formData: TTaskFormState) => {
			if (!formData.name?.trim()) {
				toast.error('Task name cannot be empty');
				return;
			}

			createTask(formData, { onSuccess: () => setIdActiveDayColumn('') });
		}, 400),
		[taskId],
	);

	const debounceUpdateTask = useCallback(
		debounce((formData: TTaskFormState) => {
			if (!formData.name?.trim()) {
				toast.error('Task name cannot be empty');
				return;
			}

			updateTask({ id: taskId, data: formData });
		}, 400),
		[taskId],
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (taskId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined,
				});
			} else {
				debounceCreateTask(formData);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [watch, debounceCreateTask, debounceUpdateTask]);
}
