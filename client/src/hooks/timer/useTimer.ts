import { useEffect } from 'react';
import { useTimerContext } from '../useTimerContexnt';
import { useProfile } from '../user/useProfile';
import { useUpdateRoundSession } from './round/useUpdateRoundSession';
import { usePomodoroSession } from './session/usePomodoroSession';
import { useDeleteSession } from './session/useDeleteSession';

export function useTimer() {
	const {
		isTimerActive,
		setIsTimerActive,
		leftSeconds,
		setLeftSeconds,
		isBreakTime,
		setIsBreakTime,
		currentRound,
	} = useTimerContext();
	const { data: userData } = useProfile();
	const { updateRound } = useUpdateRoundSession();
	const { todaySession } = usePomodoroSession();
	const { deleteSession } = useDeleteSession(() => {
		setLeftSeconds((userData?.workInterval || 25) * 60);
	});
	const workInterval = userData?.workInterval || 25;
	const breakInterval = userData?.breakInterval || 5;

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isTimerActive) {
			interval = setInterval(() => {
				setLeftSeconds(prev => {
					const nextValue = prev - 1;

					if (nextValue > 0 && nextValue % 60 === 0) {
						if (currentRound?.id) {
							updateRound({
								roundId: currentRound.id,
								data: {
									totalSeconds: nextValue,
									isCompleted: false,
								},
							});
						}
					}

					return nextValue;
				});
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isTimerActive, currentRound, updateRound]);

	useEffect(() => {
		if (leftSeconds > 0) return;

		if (isBreakTime) {
			if (currentRound?.id && todaySession?.rounds) {
				updateRound({
					roundId: currentRound.id,
					data: {
						isCompleted: true,
						totalSeconds: workInterval * 60,
					},
				});

				const activeIndex = todaySession.rounds.findIndex(
					r => r.id === currentRound.id,
				);

				if (activeIndex === todaySession.rounds.length - 1) {
					setIsTimerActive(false);
					deleteSession(todaySession.id);
				}
			}

			setIsBreakTime(false);
			setLeftSeconds(workInterval * 60);
		} else {
			setIsBreakTime(true);
			setLeftSeconds(breakInterval * 60);
		}
	}, [
		isBreakTime,
		leftSeconds,
		workInterval,
		breakInterval,
		currentRound,
		todaySession,
	]);
}
