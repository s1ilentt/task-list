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
import {
	EScheduleType,
	IStatisticSchedule,
} from '@/types/statistic.interfaces';
import { Dispatch, memo, SetStateAction } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ISchedule {
	data: IStatisticSchedule[];
	currentTypeSchedule: EScheduleType;
	setTypeSchedule: Dispatch<SetStateAction<EScheduleType>>;
}

export const Schedule = memo(
	({ data, setTypeSchedule, currentTypeSchedule }: ISchedule) => {
		const firstDate = data && data.length > 0 ? data[0].date : undefined;
		const isDesktop = useMediaQuery({ minWidth: 1280 });
		const isMobile = useMediaQuery({ maxWidth: 767 });

		return (
			<div className={styles['schedule-container']}>
				<div className={styles.header}>
					<h2>Comparison Chart of Completed Tasks</h2>
					<div className={styles.buttons}>
						<button
							onClick={() => setTypeSchedule(EScheduleType.Week)}
							disabled={EScheduleType.Week === currentTypeSchedule}
							className={styles.button}
						>
							Week
						</button>
						<button
							onClick={() => setTypeSchedule(EScheduleType.Month)}
							disabled={EScheduleType.Month === currentTypeSchedule}
							className={styles.button}
						>
							Month
						</button>
						<button
							onClick={() => setTypeSchedule(EScheduleType.Year)}
							disabled={EScheduleType.Year === currentTypeSchedule}
							className={styles.button}
						>
							Year
						</button>
					</div>
				</div>
				<div className={styles['schedule-wrapper']}>
					<ResponsiveContainer
						width='100%'
						height={isMobile ? 240 : isDesktop ? 400 : 280}
					>
						<LineChart
							data={data}
							margin={{
								top: 20,
								right: isDesktop ? 20 : 8,
								left: isDesktop ? -30 : -38,
								bottom: isDesktop ? 10 : 0,
							}}
						>
							{firstDate && (
								<ReferenceLine
									x={firstDate}
									stroke='rgba(87, 87, 87, 0.8)'
									strokeWidth={isDesktop ? 2 : 1}
								/>
							)}
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='date'
								axisLine={false}
								tickLine={false}
								padding={{ left: isDesktop ? 30 : 20 }}
								dy={10}
								style={{
									fontSize: isMobile ? '9px' : isDesktop ? '12px' : '10px',
									fontWeight: 500,
								}}
								interval='preserveStartEnd'
								minTickGap={isMobile ? 15 : isDesktop ? 40 : 25}
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
									borderRadius: isDesktop ? '8px' : '5px',
									color: '#fff',
									fontSize: isDesktop ? '16px' : '13px',
									padding: isDesktop ? '10px' : '6px',
									lineHeight: isDesktop ? '24px' : '18px',
								}}
								formatter={(value: any) => [value, 'Tasks completed']}
								itemStyle={{ color: '#fff' }}
							/>
							<Line
								type='monotone'
								dataKey='completed'
								stroke='#4e75bb'
								strokeWidth={isDesktop ? 5 : 3}
								dot={
									currentTypeSchedule === EScheduleType.Month
										? (props: any) => {
												const { index } = props;
												if (index % 4 === 0) {
													return (
														<Dot
															{...props}
															r={isMobile ? 6 : isDesktop ? 8 : 7}
															fill='#cccccc'
															strokeWidth={isDesktop ? 3 : 2}
															stroke='#4e75bb'
														/>
													);
												}
												return null;
											}
										: {
												r: isMobile ? 6 : isDesktop ? 8 : 7,
												fill: '#cccccc',
												strokeWidth: isDesktop ? 3 : 2,
												stroke: '#4e75bb',
											}
								}
								activeDot={{
									r: isMobile ? 6 : isDesktop ? 8 : 7,
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
		);
	},
);
