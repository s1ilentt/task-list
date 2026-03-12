import Cookie from 'js-cookie';

export enum ETokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken',
}

export const getAccessToken = () => {
	const accessToken = Cookie.get(ETokens.ACCESS_TOKEN);
	return accessToken || null;
};

export const saveAccessToken = (accessToken: string) => {
	Cookie.set(ETokens.ACCESS_TOKEN, accessToken, {
		//!! {domain: '.example.com', sameSite: 'none', secure: true}      for prod
		domain: process.env.NEXT_PUBLIC_DOMAIN,
		sameSite: 'strict',
		expires: 1,
	});
};

export const removeAccessToken = () => {
	Cookie.remove(ETokens.ACCESS_TOKEN);
};
