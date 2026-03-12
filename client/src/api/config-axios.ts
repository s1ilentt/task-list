import { getAccessToken, removeAccessToken } from '@/services/auth-token';
import axios, {
	AxiosInstance,
	CreateAxiosDefaults,
	InternalAxiosRequestConfig,
} from 'axios';
import { errorCatch } from './error';
import { authService } from '@/services/auth';

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
};

const api: AxiosInstance = axios.create(options);
const apiAuth: AxiosInstance = axios.create(options);

const authRequestInterceptor = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	const accessToken = getAccessToken();

	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
};

apiAuth.interceptors.request.use(authRequestInterceptor);

apiAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be proveded') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				await authService.getNewTokens();
				return apiAuth.request(originalRequest);
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeAccessToken();
				}
			}
		}

		throw error;
	},
);

export { api, apiAuth };
