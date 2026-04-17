'use client';

import { Loader } from '@/components/UI/loader/Loader';
import styles from './Statistics.module.scss';
import { Schedule } from './schedule/Schedule';
import { StatisticColumn } from './statistic-column/StatisticColumn';
import { useAllStatistics } from '@/hooks/statistic/useAllStatistics';
import { useMemo, useState } from 'react';
import { EScheduleType } from '@/types/statistic.interfaces';
import { useScheduleStatistics } from '@/hooks/statistic/useScheduleStatistics';

export function Statistics() {
	const [scheduleType, setScheduleType] = useState(EScheduleType.Week);

	const { data: statisticsData, isPending: isStatisticsPendign } =
		useAllStatistics();
	const statistics = useMemo(
		() => statisticsData?.statistics ?? [],
		[statisticsData],
	);

	const { data: scheduleData, isPending: isSchedulePending } =
		useScheduleStatistics(scheduleType);

	if (isStatisticsPendign || isSchedulePending) {
		return (
			<div className={styles['loader-wrapper']}>
				<Loader />
			</div>
		);
	}

	return (
		<section className={styles.section}>
			{statistics.length ? (
				<div className={styles['statistics-blocks']}>
					{statistics.map(statistic => (
						<StatisticColumn
							key={statistic.label}
							label={statistic.label}
							value={statistic.value}
						/>
					))}
				</div>
			) : (
				<h2 className={styles.heading}>Statistics not found</h2>
			)}
			{scheduleData?.length ? (
				<Schedule
					setTypeSchedule={setScheduleType}
					currentTypeSchedule={scheduleType}
					data={scheduleData}
				/>
			) : (
				<h2 className={styles.heading}>Chart statistics not found</h2>
			)}
		</section>
	);
}
