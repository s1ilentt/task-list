import { taskService } from '@/services/task';
import { useQuery } from '@tanstack/react-query';

export function useTasks() {
	const { data, isPending } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAll(),
	});

	return { data, isPending };
}
