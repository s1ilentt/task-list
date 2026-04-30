import { timerService } from '@/services/timer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteSession(onDeleteSuccess: () => void) {
	const queryClient = useQueryClient();

	const { mutate: deleteSession, isPending: isDeleting } = useMutation({
		mutationKey: ['delete-session'],
		mutationFn: (timerId: string) => timerService.deleteSession(timerId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-timer-session'] });
			onDeleteSuccess();
		},
	});

	return { deleteSession, isDeleting };
}
