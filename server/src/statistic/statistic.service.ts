import { Injectable } from '@nestjs/common';
import {
	addDays,
	eachDayOfInterval,
	eachMonthOfInterval,
	endOfWeek,
	endOfYear,
	format,
	startOfDay,
	startOfWeek,
	startOfYear,
} from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import { EScheduleType } from './schedule.enum';
import { TimerService } from 'src/timer/timer.service';

@Injectable()
export class StatisticService {
	constructor(
		private prisma: PrismaService,
		private timerService: TimerService,
	) {}

	async getAllStatistics(userId: string) {
		const now = new Date();
		const todayStart = startOfDay(now);
		const todayEnd = addDays(todayStart, 1);
		const weekStart = startOfWeek(now, { weekStartsOn: 1 });
		const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
		const yearStart = startOfYear(now);
		const yearEnd = endOfYear(now);

		const [completedTasks, todayStats, weekStats, yearStats, todaySession] = await Promise.all([
			this.prisma.task.count({ where: { userId, isCompleted: true } }),

			this.prisma.task.groupBy({
				by: ['isCompleted'],
				where: { userId, dueDate: { gte: todayStart, lt: todayEnd } },
				_count: true,
			}),

			this.prisma.task.groupBy({
				by: ['isCompleted'],
				where: { userId, dueDate: { gte: weekStart, lte: weekEnd } },
				_count: true,
			}),

			this.prisma.task.groupBy({
				by: ['isCompleted'],
				where: { userId, dueDate: { gte: yearStart, lte: yearEnd } },
				_count: true,
			}),

			this.timerService.getTodaySession(userId),
		]);

		const getCounts = (stats: any[]) => ({
			total: stats.reduce((acc, curr) => acc + curr._count, 0),
			completed: stats.find(s => s.isCompleted)?._count || 0,
		});

		const today = getCounts(todayStats);
		const week = getCounts(weekStats);
		const year = getCounts(yearStats);

		const totalRounds = todaySession?.rounds.length || 0;
		const completedRounds = todaySession?.rounds.filter(r => r.isCompleted).length || 0;
		const totalSecondsSpent = todaySession?.rounds.reduce((acc, r) => acc + r.totalSeconds, 0) || 0;

		return {
			statistics: [
				{
					label: 'Today tasks',
					value: [
						{ label: 'Total', value: today.total },
						{ label: 'Completed', value: today.completed },
						{ label: 'Remaining', value: Math.max(0, today.total - today.completed) },
					],
				},
				{
					label: 'Week tasks',
					value: [
						{ label: 'Total', value: week.total },
						{ label: 'Completed', value: week.completed },
						{ label: 'Remaining', value: Math.max(0, week.total - week.completed) },
					],
				},
				{
					label: 'Year tasks',
					value: [
						{ label: 'Total', value: year.total },
						{ label: 'Completed', value: year.completed },
						{ label: 'Remaining', value: Math.max(0, year.total - year.completed) },
					],
				},
				{
					label: 'Pomodoro rounds',
					value: [
						{ label: 'Total', value: totalRounds },
						{ label: 'Completed', value: completedRounds },
						{ label: 'Remaining', value: Math.max(0, totalRounds - completedRounds) },
					],
				},
				{ label: 'Completed tasks', value: completedTasks },
				{ label: 'Work time today', value: Math.floor(totalSecondsSpent / 60) },
			],
		};
	}

	async getStatisticsForSchedule(userId: string, type: EScheduleType) {
		const now = new Date();
		const today = startOfDay(now);

		if (type === 'week') {
			const start = addDays(today, -6);
			const tasks = await this.getTasksForInterval(userId, start, now);
			const days = eachDayOfInterval({ start, end: today });

			return this.mapTasksToInterval(tasks, days, 'yyyy-MM-dd', 'eee');
		}

		if (type === 'month') {
			const start = addDays(today, -29);
			const tasks = await this.getTasksForInterval(userId, start, now);
			const days = eachDayOfInterval({ start, end: today });

			return this.mapTasksToInterval(tasks, days, 'yyyy-MM-dd', 'd MMM');
		}

		if (type === 'year') {
			const start = addDays(today, -365);
			const tasks = await this.getTasksForInterval(userId, start, now);

			const months = eachMonthOfInterval({ start, end: today });

			return months.map(month => {
				const monthKey = format(month, 'yyyy-MM');

				const completed = tasks.filter(
					task => format(new Date(task.dueDate!), 'yyyy-MM') === monthKey,
				).length;

				return {
					date: format(month, 'MMM yyyy'),
					completed,
				};
			});
		}
	}

	private async getTasksForInterval(userId: string, start: Date, end: Date) {
		return this.prisma.task.findMany({
			where: {
				userId,
				isCompleted: true,
				dueDate: { gte: start.toISOString(), lte: end.toISOString() },
			},
			select: { dueDate: true },
		});
	}

	private mapTasksToInterval(
		tasks: any[],
		interval: Date[],
		groupFormat: string,
		labelFormat: string,
	) {
		const statsMap = tasks.reduce(
			(acc, task) => {
				const key = format(new Date(task.dueDate!), groupFormat);
				acc[key] = (acc[key] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		return interval.map(date => {
			const key = format(date, groupFormat);
			return {
				date: format(date, labelFormat),
				completed: statsMap[key] || 0,
			};
		});
	}
}
