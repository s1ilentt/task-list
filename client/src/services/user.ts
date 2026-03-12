import { apiAuth } from '@/api/config-axios';
import { IUser, TUserForm } from '@/types/auth.interfaces';

class UserService {
	private baseUrl = 'user/profile';

	async getProfile() {
		const { data } = await apiAuth.get<IUser>(this.baseUrl);
		return data;
	}

	async update(userFormData: TUserForm) {
		const { data } = await apiAuth.put(this.baseUrl, userFormData);
		return data;
	}
}

export const userService = new UserService();
