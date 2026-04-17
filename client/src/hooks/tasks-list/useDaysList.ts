import { generateDays } from '@/utils/generate-days';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export function useDaysList() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['days-list'],
			queryFn: ({ pageParam }) => generateDays(pageParam, 10),
			initialPageParam: dayjs().format('YYYY-MM-DD'),
			getNextPageParam: lastPage => {
				const lastDate = lastPage[lastPage.length - 1].id;
				return dayjs(lastDate).add(1, 'day').format('YYYY-MM-DD');
			},
			select: data => data.pages.flat(),
		});

	return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
}
