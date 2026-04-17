import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatLastWord } from './format-string';

dayjs.extend(utc);

export const generateDays = (startDate: string | Date, count: number) => {
	return Array.from({ length: count }).map((_, i) => {
		const date = dayjs.utc(startDate).add(i, 'day').startOf('day');

		return {
			id: date.toISOString(),
			display: formatLastWord(date.format('D MMM dddd').toLowerCase()),
		};
	});
};
