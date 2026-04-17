import { TaskAddContext } from '@/providers/TaskAddProvider';
import { useContext } from 'react';

export const useTaskContext = () => {
	const context = useContext(TaskAddContext);

	if (!context) {
		throw new Error('useTaskContext must be used within a TaskAddProvider');
	}

	return context;
};
