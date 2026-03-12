import styles from './StatisticColumn.module.scss';
import { CircleProgressBar } from '@/components/progress-bar/CircleProgressBar';
import { IStatisticAll } from '@/types/statistic.interfaces';

type TStatistic = IStatisticAll['statistics'][number];

export function StatisticColumn({ label, value }: TStatistic) {
	const valueIsArray = Array.isArray(value);

	let totalTasks: number = 0;
	let completedTasks: number = 0;

	if (valueIsArray) {
		totalTasks = value.find(i => i.label === 'Total')?.value ?? 0;
		completedTasks = value.find(i => i.label === 'Completed')?.value ?? 0;
	}

	return valueIsArray ? (
		<div className={styles.wrapper}>
			<div>
				<CircleProgressBar
					totalTasks={totalTasks}
					completedTasks={completedTasks}
				/>
			</div>
			<div>
				<h3 className={styles.heading}>{label}</h3>
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
		<div className={styles['simple-wrapper']}>
			<div>
				<h3>{label}</h3>
				<div className={styles['number-text']}>{value}</div>
			</div>
		</div>
	);
}
