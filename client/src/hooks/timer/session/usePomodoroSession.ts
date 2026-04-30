import { useProfile } from '@/hooks/user/useProfile';
import { useTimerContext } from '@/hooks/useTimerContexnt';
import { timerService } from '@/services/timer';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function usePomodoroSession() {
	const { setCurrentRound, setLeftSeconds, isTimerActive, isBreakTime } =
		useTimerContext();
	const { data: userData } = useProfile();

	const {
		data: todaySession,
		isPending,
		isSuccess,
	} = useQuery({
		queryKey: ['get-timer-session'],
		queryFn: () => timerService.getTodaySession(),
	});

	useEffect(() => {
		const rounds = todaySession?.rounds;

		if (!isSuccess || !rounds) return;

		const activeRound = rounds.find(round => !round.isCompleted);
		setCurrentRound(activeRound);

		if (activeRound && !isTimerActive) {
			const interval =
				(isBreakTime ? userData?.breakInterval : userData?.workInterval) || 25;
			const serverSeconds = interval * 60 - activeRound.totalSeconds;

			setLeftSeconds(prev => (prev !== serverSeconds ? serverSeconds : prev));
		}
	}, [
		isSuccess,
		userData?.workInterval,
		userData?.breakInterval,
		todaySession,
		isBreakTime,
	]);

	return { todaySession, isPending, isSuccess };
}
