import { IBase } from './base.interface';

export enum ETaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export interface ITask extends IBase {
	name: string;
	priority?: ETaskPriority;
	isCompeted: boolean;
}

export type TTaskFormState = Partial<Omit<ITask, 'id' | 'updatedAt'>>;
