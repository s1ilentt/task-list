'use client';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
	Dot,
} from 'recharts';
import styles from './Schedule.module.scss';
import { useScheduleStatistics } from '@/hooks/statistic/useScheduleStatistics';
import { EScheduleType } from '@/types/statistic.interfaces';
import { useState } from 'react';

export function Schedule() {
	const [typeSchedule, setTypeSchedule] = useState(EScheduleType.Week);

	const { data, isLoading } = useScheduleStatistics(typeSchedule);

	const firstDate = data && data.length > 0 ? data[0].date : undefined;

	if (!data && isLoading) {
		return <div>Loading...</div>;
	}

	return data ? (
		<div className={styles['schedule-container']}>
			<div className={styles.header}>
				<h2>Comparison Chart of Completed Tasks</h2>
				<div className={styles.buttons}>
					<button
						onClick={() => setTypeSchedule(EScheduleType.Week)}
						disabled={EScheduleType.Week === typeSchedule}
						className={styles.button}
					>
						Week
					</button>
					<button
						onClick={() => setTypeSchedule(EScheduleType.Month)}
						disabled={EScheduleType.Month === typeSchedule}
						className={styles.button}
					>
						Month
					</button>
					<button
						onClick={() => setTypeSchedule(EScheduleType.Year)}
						disabled={EScheduleType.Year === typeSchedule}
						className={styles.button}
					>
						Year
					</button>
				</div>
			</div>
			<div className={styles['schedule-wrapper']}>
				<ResponsiveContainer
					width='100%'
					height={400}
				>
					<LineChart
						key={typeSchedule}
						data={data}
						margin={{ top: 20, right: 20, left: -30, bottom: 10 }}
					>
						{firstDate && (
							<ReferenceLine
								x={firstDate}
								stroke='rgba(87, 87, 87, 0.8)'
								strokeWidth={2}
							/>
						)}
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							axisLine={false}
							tickLine={false}
							padding={{ left: 30 }}
							dy={10}
							style={{ fontSize: '12px', fontWeight: 500 }}
							interval='preserveStartEnd'
							minTickGap={50}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							dy={-10}
							allowDecimals={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: 'rgb(50, 50, 50)',
								border: 'none',
								borderRadius: '8px',
								color: '#fff',
							}}
							formatter={(value: any) => [value, 'Tasks completed']}
							itemStyle={{ color: '#fff' }}
						/>
						<Line
							type='monotone'
							dataKey='completed'
							stroke='#4e75bb'
							strokeWidth={5}
							dot={
								typeSchedule === EScheduleType.Month
									? (props: any) => {
											const { index } = props;
											if (index % 4 === 0) {
												return (
													<Dot
														{...props}
														r={8}
														fill='#cccccc'
														strokeWidth={3}
														stroke='#4e75bb'
													/>
												);
											}
											return null;
										}
									: { r: 8, fill: '#cccccc', strokeWidth: 3, stroke: '#4e75bb' }
							}
							activeDot={{
								r: 8,
								fill: '#4e75bb',
								stroke: '#4e75bb',
								strokeWidth: 2,
							}}
							className={styles.line_shadow}
							animationDuration={1500}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	) : (
		<h2 className={styles['heading-error']}>Statistics chart not found</h2>
	);
}
