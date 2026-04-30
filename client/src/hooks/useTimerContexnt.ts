import { TimerContext } from '@/providers/TimerProvider';
import { useContext } from 'react';

export function useTimerContext() {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error('useTimerContext must be used within a TaskAddProvider');
	}

	return context;
}
