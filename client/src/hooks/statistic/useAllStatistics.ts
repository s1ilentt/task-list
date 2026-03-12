import { statisticService } from '@/services/statistic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export function useAllStatistics() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['statistics-all'],
		queryFn: () => statisticService.getAllStatistics(),
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
