import { statisticService } from '@/services/statistic';
import { useQuery } from '@tanstack/react-query';

export function useAllStatistics() {
	const { data, isPending } = useQuery({
		queryKey: ['statistics-all'],
		queryFn: () => statisticService.getAllStatistics(),
	});

	return { data, isPending };
}
