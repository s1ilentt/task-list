import { timerService } from '@/services/timer';
import { TTimerSessionState } from '@/types/timer.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateSession() {
	const queryClient = useQueryClient();

	const { mutate: updatePomodoroSession, isPending: isUpdating } = useMutation({
		mutationKey: ['update-session'],
		mutationFn: ({
			timerId,
			data,
		}: {
			timerId: string;
			data: TTimerSessionState;
		}) => timerService.updateSession(timerId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-timer-session'] });
		},
	});

	return { updatePomodoroSession, isUpdating };
}
