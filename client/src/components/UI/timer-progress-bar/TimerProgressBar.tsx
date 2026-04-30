'use client';

import { useTimerContext } from '@/hooks/useTimerContexnt';
import styles from './TimerProgressBar.module.scss';
import { useProfile } from '@/hooks/user/useProfile';
import { useMemo } from 'react';
import { formatTime } from '@/utils/format-time';
import { usePomodoroSession } from '@/hooks/timer/session/usePomodoroSession';
import { TimerProgressButtons } from '../timer-progress-buttons/TimerProgressButtons';

interface ICircleProgressBar {
	size?: number;
	strokeWidth?: number;
	differenceStroke?: number;
}

export function TimerProgressBar({
	size = 400,
	strokeWidth = 8,
	differenceStroke = 1,
}: ICircleProgressBar) {
	const { leftSeconds, isBreakTime, currentRound } = useTimerContext();
	const { todaySession } = usePomodoroSession();
	const { data: userData } = useProfile();
	const workInterval = userData?.workInterval || 25;
	const breakInterval = userData?.breakInterval || 5;

	const elapsedMinutes = useMemo(() => {
		const currentInterval = isBreakTime ? breakInterval : workInterval;

		if (leftSeconds === 0) return currentInterval;
		if (leftSeconds < 60) {
			return currentInterval - 1;
		}

		return currentInterval - Math.floor(leftSeconds / 60);
	}, [leftSeconds, workInterval, isBreakTime, breakInterval]);

	const percent =
		elapsedMinutes > 0 && todaySession
			? (elapsedMinutes / (isBreakTime ? breakInterval : workInterval)) * 100
			: 0;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percent / 100) * circumference;

	const center = size / 2;

	return (
		<div className={styles.wrapper}>
			<svg
				width={size}
				height={size}
			>
				<circle
					cx={center}
					cy={center}
					r={radius}
					stroke='#C8C8C81A'
					strokeWidth={strokeWidth - differenceStroke}
					fill='transparent'
				/>
				<circle
					className={styles.circle}
					cx={center}
					cy={center}
					strokeWidth={strokeWidth}
					r={radius}
					fill='transparent'
					style={{
						strokeDasharray: circumference,
						strokeDashoffset: offset,
					}}
				/>
				<text
					className={styles.text}
					x={center}
					y={center}
					textAnchor='middle'
					dominantBaseline='middle'
				>
					{formatTime(todaySession ? leftSeconds : workInterval * 60)}
				</text>
			</svg>
			{todaySession && (
				<div className={styles['display-state-timer']}>
					{`${isBreakTime ? 'Break' : 'Work'} time`}
				</div>
			)}
			<TimerProgressButtons
				rounds={todaySession?.rounds}
				activeRound={currentRound}
			/>
		</div>
	);
}
