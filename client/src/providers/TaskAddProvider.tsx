'use client';

import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useMemo,
	useState,
} from 'react';

export interface ITaskAddContext {
	idActiveDayColumn: string;
	setIdActiveDayColumn: Dispatch<SetStateAction<string>>;
}

export const TaskAddContext = createContext<ITaskAddContext | undefined>(
	undefined,
);

export function TaskAddProvider({ children }: PropsWithChildren) {
	const [idActiveDayColumn, setIdActiveDayColumn] = useState('');

	const value = useMemo(
		() => ({
			idActiveDayColumn,
			setIdActiveDayColumn,
		}),
		[idActiveDayColumn, setIdActiveDayColumn],
	);

	return (
		<TaskAddContext.Provider value={value}>{children}</TaskAddContext.Provider>
	);
}
