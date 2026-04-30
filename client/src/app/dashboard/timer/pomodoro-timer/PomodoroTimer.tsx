'use client';

import { Loader } from '@/components/UI/loader/Loader';
import { useCreatePomodoroSession } from '@/hooks/timer/session/useCreatePomodoroSession';
import { usePomodoroSession } from '@/hooks/timer/session/usePomodoroSession';
import { useTimer } from '@/hooks/timer/useTimer';
import { useTimerContext } from '@/hooks/useTimerContexnt';
import { useEffect } from 'react';
import styles from './PomodoroTimer.module.scss';
import { TimerProgressBar } from '@/components/UI/timer-progress-bar/TimerProgressBar';
import { Button } from './button/Button';
import { useTimerActions } from '@/hooks/timer/useTimerActions';
import { useDeleteSession } from '@/hooks/timer/session/useDeleteSession';
import { useProfile } from '@/hooks/user/useProfile';
import { useMediaQuery } from 'react-responsive';

export function PomodoroTimer() {
	const { data: userData } = useProfile();
	const { todaySession, isPending } = usePomodoroSession();
	const timerContext = useTimerContext();
	const { pauseHandler, playHandler } = useTimerActions();
	const { createPomodoroSession } = useCreatePomodoroSession(() => {
		timerContext.setLeftSeconds((userData?.workInterval || 25) * 60);
		playHandler();
	});
	const { deleteSession } = useDeleteSession(() => {
		timerContext.setLeftSeconds((userData?.workInterval || 25) * 60);
	});
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useTimer();

	useEffect(() => {
		return () => {
			timerContext.setIsTimerActive(false);
		};
	}, []);

	if (isPending)
		return (
			<div className='flex items-center justify-center h-[80vh]'>
				<Loader />
			</div>
		);

	return (
		<div className={styles.wrapper}>
			<TimerProgressBar size={isMobile ? 280 : 400} />
			<div className={styles.buttons}>
				{todaySession ? (
					timerContext.isTimerActive ? (
						<Button clickHandler={() => pauseHandler()}>Pause</Button>
					) : (
						<div className='flex flex-col gap-y-3'>
							<Button
								filled
								clickHandler={() => playHandler()}
							>
								Continue
							</Button>
							<Button clickHandler={() => deleteSession(todaySession.id)}>
								Finish
							</Button>
						</div>
					)
				) : (
					<Button
						filled
						clickHandler={() => createPomodoroSession()}
					>
						Start
					</Button>
				)}
			</div>
		</div>
	);
}
