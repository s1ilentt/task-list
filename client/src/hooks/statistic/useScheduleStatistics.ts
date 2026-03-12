import { statisticService } from '@/services/statistic';
import { TStatisticSchedule } from '@/types/statistic.interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export function useScheduleStatistics(type: TStatisticSchedule) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['statistics-schedule', type],
		queryFn: () => statisticService.getStatisticsForSchedule(type),
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (isError && error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data?.detail, 'error');
			} else {
				console.log(error.message, 'error');
			}
		}
	}, [isError]);

	return { data, isLoading };
}
