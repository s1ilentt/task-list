export interface IStatisticsValueData {
	label: string;
	value: number;
}

export interface IStatisticAll {
	statistics: {
		label: string;
		value: number | IStatisticsValueData[];
	}[];
}

export interface IStatisticSchedule {
	date: string;
	completed: number;
}

export enum EScheduleType {
	Week = 'week',
	Month = 'month',
	Year = 'year',
}

export type TStatisticSchedule = EScheduleType;
