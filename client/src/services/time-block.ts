import { apiAuth } from '@/api/config-axios';
import { ITimeBlock, TTimeBlockState } from '@/types/time-block.interfaces';

class TimeBlockService {
	private baseUrl = 'user/time-blocks';

	async getTimeBlocks() {
		const response = await apiAuth.get<ITimeBlock[]>(this.baseUrl);
		return response;
	}

	async create(data: TTimeBlockState) {
		const response = await apiAuth.post(this.baseUrl, data);
		return response;
	}

	async update(id: string, data: TTimeBlockState) {
		const response = await apiAuth.put(`${this.baseUrl}/${id}`, data);
		return response;
	}

	async updateOrderTimeBlock(ids: string[]) {
		const response = await apiAuth.put(`${this.baseUrl}/update-order`, { ids });
		return response;
	}

	async delete(id: string) {
		const response = await apiAuth.delete(`${this.baseUrl}/${id}`);
		return response;
	}
}

export const timeBlockService = new TimeBlockService();
