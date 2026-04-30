import { timerService } from '@/services/timer';
import { TTimerRoundState } from '@/types/timer.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateRoundSession() {
	const queryClient = useQueryClient();

	const { mutate: updateRound, isPending: isRoundUpdating } = useMutation({
		mutationKey: ['update-round'],
		mutationFn: ({
			roundId,
			data,
		}: {
			roundId: string;
			data: TTimerRoundState;
		}) => timerService.updateRoundSession(roundId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-timer-session'] });
		},
	});

	return { updateRound, isRoundUpdating };
}
