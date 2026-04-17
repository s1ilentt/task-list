'use client';

import { Loader } from '@/components/UI/loader/Loader';
import { useDaysList } from '@/hooks/tasks-list/useDaysList';
import { useTasks } from '@/hooks/tasks-list/useTasks';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTaskDnd } from '@/hooks/tasks-list/useTaskDnd';
import { DayColumn } from './day-column/DayColumn';
import { useTasksByDate } from '@/hooks/tasks-list/useTasksByDate';
import styles from './TasksList.module.scss';

const EMPTY_TASKS: any[] = [];

export function TasksList() {
	const [isDragging, setIsDragging] = useState(false);

	const { data: daysList, fetchNextPage, hasNextPage } = useDaysList();
	const { data: tasks, isPending } = useTasks();
	const tasksByDate = useTasksByDate(tasks);

	const onDragEnd = useTaskDnd(() => setIsDragging(false));

	const { ref, inView } = useInView({
		rootMargin: '100px',
	});

	useEffect(() => {
		if (inView && hasNextPage && !isDragging) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage, isDragging]);

	if (isPending)
		return (
			<div className='flex items-center justify-center h-[80vh]'>
				<Loader />
			</div>
		);

	return (
		<section className={styles.section}>
			{daysList ? (
				<>
					<DragDropContext
						onDragStart={() => setIsDragging(true)}
						onDragEnd={onDragEnd}
					>
						<ul>
							{daysList.map(day => (
								<DayColumn
									key={day.id}
									day={day}
									dayTasks={tasksByDate[day.id] || EMPTY_TASKS}
								/>
							))}
						</ul>
					</DragDropContext>

					<div
						ref={ref}
						className='h-1'
					></div>
				</>
			) : (
				<h2>Date not defined</h2>
			)}
		</section>
	);
}
