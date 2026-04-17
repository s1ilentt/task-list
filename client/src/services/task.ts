import { apiAuth } from '@/api/config-axios';
import { ITask, TTaskFormState } from '@/types/task.interfaces';

class TaskService {
	private baseUrl = 'user/tasks';

	async getAll() {
		const { data } = await apiAuth.get<ITask[]>(this.baseUrl);
		return data;
	}

	async create(data: TTaskFormState) {
		const response = await apiAuth.post(this.baseUrl, data);
		return response;
	}

	async update(id: string, data: TTaskFormState) {
		const response = await apiAuth.put(`${this.baseUrl}/${id}`, data);
		return response;
	}

	async delete(id: string) {
		const response = await apiAuth.delete(`${this.baseUrl}/${id}`);
		return response;
	}
}

export const taskService = new TaskService();
