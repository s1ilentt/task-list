import { IBase } from './base.interface';

export interface ITimeBlock extends IBase {
	name: string;
	duration: number;
	color?: string;
	order: number;
}

export type TTimeBlockState = Partial<
	Omit<ITimeBlock, 'createdAt' | 'updatedAt'>
>;
