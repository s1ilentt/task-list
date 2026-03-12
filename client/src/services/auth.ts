import { api } from '@/api/config-axios';
import { IAuthForm, IAuthResponse, TAuthMode } from '@/types/auth.interfaces';
import { removeAccessToken, saveAccessToken } from './auth-token';

class AuthService {
	private baseUrl = 'auth';

	async logAndReg(type: TAuthMode, data: IAuthForm) {
		const response = await api.post<IAuthResponse>(
			`${this.baseUrl}/${type}`,
			data,
		);

		const accessToken = response.data.accessToken;

		if (accessToken) {
			saveAccessToken(accessToken);
		}

		return response;
	}

	async getNewTokens() {
		const response = await api.post<IAuthResponse>(
			`${this.baseUrl}/login/access-token`,
		);

		const accessToken = response.data.accessToken;

		if (accessToken) {
			saveAccessToken(accessToken);
		}

		return response;
	}

	async logout() {
		const response = await api.post<boolean>(`${this.baseUrl}/logout`);

		if (response.data) {
			removeAccessToken();
		}

		return response;
	}
}

export const authService = new AuthService();
