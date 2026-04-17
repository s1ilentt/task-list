import { statisticService } from '@/services/statistic';
import { TStatisticSchedule } from '@/types/statistic.interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useScheduleStatistics(type: TStatisticSchedule) {
	const { data, isPending } = useQuery({
		queryKey: ['statistics-schedule', type],
		queryFn: () => statisticService.getStatisticsForSchedule(type),
		placeholderData: keepPreviousData,
	});

	return { data, isPending };
}
