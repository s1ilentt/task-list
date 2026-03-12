export interface IAuthForm {
	email: string;
	password: string;
	name?: string;
}

export interface IUser {
	id: number;
	name?: string;
	email: string;

	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export interface IAuthResponse {
	accessToken: string;
	user: IUser;
}

export type TUserForm = Omit<IUser, 'id'> & { password?: string };

export type TAuthMode = 'login' | 'register';
export type TAuthFormField = 'email' | 'password' | 'name';
