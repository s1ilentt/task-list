import { useCallback } from 'react';
import { useProfile } from '../user/useProfile';
import { useTimerContext } from '../useTimerContexnt';
import { useUpdateRoundSession } from './round/useUpdateRoundSession';
import { usePomodoroSession } from './session/usePomodoroSession';

export function useTimerActions() {
	const { currentRound, setIsTimerActive, leftSeconds, isBreakTime } =
		useTimerContext();
	const { updateRound } = useUpdateRoundSession();
	const { data: userData } = useProfile();
	const { todaySession } = usePomodoroSession();

	const pauseHandler = useCallback(() => {
		if (!userData?.workInterval || !userData?.breakInterval) return;

		const totalSeconds =
			(isBreakTime ? userData?.breakInterval : userData.workInterval) * 60 -
			leftSeconds;
		setIsTimerActive(false);

		if (currentRound?.id) {
			updateRound({
				roundId: currentRound.id,
				data: {
					totalSeconds,
					isCompleted:
						totalSeconds >=
						(isBreakTime ? userData.breakInterval : userData.workInterval) * 60,
				},
			});
		}
	}, [
		currentRound,
		leftSeconds,
		userData?.workInterval,
		userData?.breakInterval,
		isBreakTime,
	]);

	const playHandler = useCallback(() => {
		setIsTimerActive(true);
	}, [setIsTimerActive]);

	const prevRoundHandler = useCallback(async () => {
		const rounds = todaySession?.rounds;
		if (!rounds?.length || !currentRound || !userData?.workInterval) return;

		const activeIndex = rounds.findIndex(r => r.id === currentRound.id);

		await updateRound({
			roundId: currentRound.id,
			data: {
				isCompleted: false,
				totalSeconds: 0,
			},
		});

		const totalSeconds = userData.workInterval * 60 - leftSeconds;

		if (activeIndex > 0) {
			const prevRound = rounds[activeIndex - 1];

			await updateRound({
				roundId: prevRound.id,
				data: {
					isCompleted: false,
					totalSeconds,
				},
			});
		}
	}, [
		todaySession?.rounds,
		updateRound,
		currentRound,
		userData?.workInterval,
		leftSeconds,
	]);

	const nextRoundHandler = useCallback(async () => {
		const rounds = todaySession?.rounds;
		if (!rounds?.length || !currentRound || !userData?.workInterval) return;

		const activeIndex = rounds.findIndex(r => r.id === currentRound.id);

		await updateRound({
			roundId: currentRound.id,
			data: {
				isCompleted: true,
				totalSeconds: (userData?.workInterval || 25) * 60,
			},
		});

		const totalSeconds = userData.workInterval * 60 - leftSeconds;

		if (activeIndex < rounds.length - 1) {
			const nextRound = rounds[activeIndex + 1];

			await updateRound({
				roundId: nextRound.id,
				data: {
					isCompleted: false,
					totalSeconds,
				},
			});
		}
	}, [
		userData?.workInterval,
		currentRound,
		updateRound,
		todaySession?.rounds,
		leftSeconds,
	]);

	return { prevRoundHandler, nextRoundHandler, pauseHandler, playHandler };
}
