import { apiAuth } from '@/api/config-axios';
import {
	IStatisticAll,
	IStatisticSchedule,
	TStatisticSchedule,
} from '@/types/statistic.interfaces';

class StatisticService {
	private baseUrl = 'user/statistic';

	async getAllStatistics() {
		await new Promise(resolve => setTimeout(resolve, 3000));
		const { data } = await apiAuth.get<IStatisticAll>(this.baseUrl);
		return data;
	}

	async getStatisticsForSchedule(type: TStatisticSchedule) {
		const { data } = await apiAuth.get<IStatisticSchedule[]>(
			`${this.baseUrl}/schedule`,
			{
				params: { type },
			},
		);
		return data;
	}
}

export const statisticService = new StatisticService();
