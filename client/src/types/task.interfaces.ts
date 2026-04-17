import { IBase } from './base.interface';

export enum ETaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export interface ITask extends IBase {
	name: string;
	dueDate: string;
	priority?: ETaskPriority;
	isCompleted: boolean;
}

export type TTaskFormState = Partial<Omit<ITask, keyof IBase>>;
