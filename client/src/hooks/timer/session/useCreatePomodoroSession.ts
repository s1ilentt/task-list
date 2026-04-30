import { timerService } from '@/services/timer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePomodoroSession(onCreateSuccess: () => void) {
	const queryClient = useQueryClient();

	const { mutate: createPomodoroSession, isPending: isCreating } = useMutation({
		mutationKey: ['create-session'],
		mutationFn: () => timerService.createSession(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-timer-session'] });
			onCreateSuccess();
		},
	});

	return { createPomodoroSession, isCreating };
}
