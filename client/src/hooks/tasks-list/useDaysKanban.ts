import { generateDays } from '@/utils/generate-days';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isToday);
dayjs.extend(isoWeek);

export function useDaysKanban(inputDate: string) {
	const dateObj = dayjs(inputDate, 'YYYY-MM-DD');

	let startDate: string;
	let daysCount: number;

	if (dateObj.isToday()) {
		startDate = inputDate;
		daysCount = 7 - dateObj.isoWeekday() + 1;
	} else {
		// Always start on Monday
		startDate = dateObj.startOf('isoWeek').format('YYYY-MM-DD');
		daysCount = 7;
	}

	const { data: kanbanDays, isPending: isDaysPending } = useQuery({
		queryKey: ['days-kanban', startDate],
		queryFn: () => generateDays(startDate, daysCount),
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 60,
	});

	return { kanbanDays, isDaysPending };
}
