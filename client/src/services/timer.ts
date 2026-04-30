import { apiAuth } from '@/api/config-axios';
import {
	ITimerSession,
	TTimerRoundState,
	TTimerSessionState,
} from '@/types/timer.interfaces';

class TimerService {
	private baseUrl = 'user/timer';

	async getTodaySession() {
		const { data } = await apiAuth.get<ITimerSession>(`${this.baseUrl}/today`);
		return data;
	}

	async createSession() {
		const response = await apiAuth.post<ITimerSession>(this.baseUrl);
		return response;
	}

	async updateSession(id: string, data: TTimerSessionState) {
		const response = await apiAuth.put(`${this.baseUrl}/${id}`, data);
		return response;
	}

	async deleteSession(id: string) {
		const response = await apiAuth.delete(`${this.baseUrl}/${id}`);
		return response;
	}

	async updateRoundSession(id: string, data: TTimerRoundState) {
		const response = await apiAuth.put(`${this.baseUrl}/round/${id}`, data);
		return response;
	}
}

export const timerService = new TimerService();
