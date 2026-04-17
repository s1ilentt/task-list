import { useUpdateTask } from './useUpdateTask';
import { DropResult } from '@hello-pangea/dnd';

export function useTaskDnd(isDraggingEnd?: () => void) {
	const { updateTask } = useUpdateTask();

	const onDragEnd = (result: DropResult) => {
		if (isDraggingEnd) {
			isDraggingEnd();
		}

		if (!result.destination) return;

		const destinationColumnId = result.destination.droppableId;

		if (destinationColumnId === result.source.droppableId) return;

		updateTask({
			id: result.draggableId,
			data: {
				dueDate: destinationColumnId,
			},
		});
	};

	return onDragEnd;
}
