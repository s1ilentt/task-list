'use client';

import { ITimerRound } from '@/types/timer.interfaces';
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useMemo,
	useState,
	createContext,
} from 'react';

interface ITimerContext {
	leftSeconds: number;
	setLeftSeconds: Dispatch<SetStateAction<number>>;
	isTimerActive: boolean;
	setIsTimerActive: Dispatch<SetStateAction<boolean>>;
	isBreakTime: boolean;
	setIsBreakTime: Dispatch<SetStateAction<boolean>>;
	currentRound: ITimerRound | undefined;
	setCurrentRound: Dispatch<SetStateAction<ITimerRound | undefined>>;
}

export const TimerContext = createContext<ITimerContext | undefined>(undefined);

export function TimerProvider({ children }: PropsWithChildren) {
	const [leftSeconds, setLeftSeconds] = useState(25 * 60);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [isBreakTime, setIsBreakTime] = useState(false);

	const [currentRound, setCurrentRound] = useState<ITimerRound | undefined>(
		undefined,
	);

	const value = useMemo(
		() => ({
			leftSeconds,
			setLeftSeconds,
			isTimerActive,
			setIsTimerActive,
			isBreakTime,
			setIsBreakTime,
			currentRound,
			setCurrentRound,
		}),
		[leftSeconds, isTimerActive, currentRound, isBreakTime],
	);

	return (
		<TimerContext.Provider value={value}>{children}</TimerContext.Provider>
	);
}
