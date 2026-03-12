import { IBase } from './base.interface';

export interface ITimerRound extends IBase {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface ITimerSession extends IBase {
	isCompleted?: boolean;
	rounds?: ITimerRound[];
}

export type TTimerSessionState = Partial<
	Omit<ITimerSession, 'id' | 'createdAt' | 'updatedAt'>
>;

export type TTimerRoundState = Partial<
	Omit<ITimerRound, 'id' | 'createdAt' | 'updatedAt'>
>;
