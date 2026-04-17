'use client';

import { IDay } from '@/types/day.interface';
import { ITask } from '@/types/task.interfaces';
import { Droppable } from '@hello-pangea/dnd';
import { memo } from 'react';
import { TaskRow } from './task-row/TaskRow';
import styles from './DayColumn.module.scss';
import { Plus } from 'lucide-react';
import { useTaskContext } from '@/hooks/useTaskContext';

interface IDayColumn {
	day: IDay;
	dayTasks: ITask[];
}

export const DayColumn = memo(({ day, dayTasks }: IDayColumn) => {
	const { idActiveDayColumn, setIdActiveDayColumn } = useTaskContext();

	return (
		<Droppable
			droppableId={day.id}
			type='COLUMN'
		>
			{provided => (
				<div
					className={styles.wrapper}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<h3 className={styles.heading}>{day.display}</h3>

					<ul>
						{dayTasks.length > 0 &&
							dayTasks.map((task, index) => (
								<TaskRow
									key={task.id}
									task={task}
									index={index}
								/>
							))}

						{day.id === idActiveDayColumn && (
							<TaskRow
								task={{
									name: '',
									dueDate: day.id,
									isCompleted: false,
									id: '',
								}}
								index={dayTasks.length}
								isTemp
							/>
						)}

						{provided.placeholder}
					</ul>

					{day.id !== idActiveDayColumn && (
						<button
							className={styles['add-task-button']}
							onClick={() => setIdActiveDayColumn(day.id)}
						>
							<Plus
								className={styles['plus-icon']}
								size={21}
								strokeWidth={1}
							/>
							<span>Add task</span>
						</button>
					)}
				</div>
			)}
		</Droppable>
	);
});
