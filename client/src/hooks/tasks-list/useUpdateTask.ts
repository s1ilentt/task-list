import { taskService } from '@/services/task';
import { ITask, TTaskFormState } from '@/types/task.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ['task', key],
		mutationFn: ({ id, data }: { id: string; data: TTaskFormState }) =>
			taskService.update(id, data),
		onMutate: async ({ id, data }) => {
			queryClient.cancelQueries({ queryKey: ['tasks'] });

			const previousTasks = queryClient.getQueryData<ITask[]>(['tasks']);

			queryClient.setQueryData(['tasks'], (oldTasks: ITask[] = []) =>
				oldTasks.map(task => (task.id === id ? { ...task, ...data } : task)),
			);

			return { previousTasks };
		},
		onError: (_, __, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData(['tasks'], context.previousTasks);
			}
			toast.error('Failed to update task');
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
		onSuccess: () => {
			toast.success('Task data has been updated successfully');
		},
	});

	return { updateTask };
}
