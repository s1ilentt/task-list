import { taskService } from '@/services/task';
import { TTaskFormState } from '@/types/task.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateTask() {
	const queryClient = useQueryClient();

	const { mutate: createTask, isPending: isCreatePending } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TTaskFormState) => taskService.create(data),
		onSuccess: () => {
			toast.success('Task create successfully ');

			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
	});

	return { createTask, isCreatePending };
}
