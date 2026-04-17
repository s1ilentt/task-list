'use client';

import styles from './StatisticColumn.module.scss';
import { CircleProgressBar } from '@/components/UI/progress-bar/CircleProgressBar';
import { IStatisticAll } from '@/types/statistic.interfaces';
import clsx from 'clsx';
import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';

type TStatistic = IStatisticAll['statistics'][number];

export const StatisticColumn = memo(({ label, value }: TStatistic) => {
	const valueIsArray = Array.isArray(value);
	const isTablet = useMediaQuery({ minWidth: 768 });

	let totalTasks: number = 0;
	let completedTasks: number = 0;

	if (valueIsArray) {
		totalTasks = value.find(i => i.label === 'Total')?.value ?? 0;
		completedTasks = value.find(i => i.label === 'Completed')?.value ?? 0;
	}

	const isPomodoroLabel = label.includes('Pomodoro');

	return valueIsArray ? (
		<div className={styles.wrapper}>
			{!isTablet && (
				<h3
					className={clsx(
						styles['mobile-heading'],
						isPomodoroLabel ? styles['pomodoro-mobile-heading'] : null,
					)}
				>
					{label}
				</h3>
			)}
			<div>
				<CircleProgressBar
					totalTasks={totalTasks}
					completedTasks={completedTasks}
					size={isTablet ? 140 : 120}
					strokeWidth={isTablet ? 12 : 10}
					differenceStroke={isTablet ? 2 : 1}
				/>
			</div>
			<div className={styles.info}>
				<h3
					className={clsx(
						styles.heading,
						isPomodoroLabel ? styles['pomodoro-heading'] : null,
					)}
				>
					{label}
				</h3>
				<ul>
					{value.map(i => (
						<li
							key={i.label}
							className={styles['statistic-item']}
						>
							{i.label} - <span>{i.value}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	) : (
		<div className={styles['simple-statistic-wrapper']}>
			<div>
				<h3>{label}</h3>
				{label === 'Work time today' ? (
					<div className={styles['text-with-prefix']}>
						<span>min:</span>
						<span>{value}</span>
					</div>
				) : (
					<div className={styles['number-text']}>{value}</div>
				)}
			</div>
		</div>
	);
});
