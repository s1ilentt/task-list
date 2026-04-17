import { taskService } from '@/services/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => taskService.delete(id),
		onSuccess: () => {
			toast.success('Task deleted successfully ');

			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
	});

	return { deleteTask, isDeletePending };
}
