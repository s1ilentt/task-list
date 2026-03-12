'use client';

import styles from './Statistics.module.scss';
import { Schedule } from './schedule/Schedule';
import { StatisticColumn } from './statistic-column/StatisticColumn';
import { useAllStatistics } from '@/hooks/statistic/useAllStatistics';

export function Statistics() {
	const { data, isLoading } = useAllStatistics();
	const statistics = data?.statistics?.length && data.statistics;

	return (
		<section className={styles.section}>
			{isLoading ? (
				<div>Loading</div>
			) : statistics ? (
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
				<h1 className={styles.heading}>Statistics not found</h1>
			)}
			<Schedule />
		</section>
	);
}
