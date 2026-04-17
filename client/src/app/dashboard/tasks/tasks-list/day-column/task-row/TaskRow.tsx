'use client';

import { useDeleteTask } from '@/hooks/tasks-list/useDeleteTask';
import { ITask, TTaskFormState } from '@/types/task.interfaces';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical } from 'lucide-react';
import styles from './TaskRow.module.scss';
import { Loader } from '@/components/UI/loader/Loader';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { PRIORITY_SELECT } from '@/shared/select-priority';
import { SingleSelect } from '@/components/UI/single-select/SingleSelect';
import { useTaskDebounce } from '@/hooks/tasks-list/useTaskDebounce';
import { DatePicker } from '@/components/UI/date-picker/DatePicker';
import { TransperentInput } from '@/components/UI/transperent-input/TransperentInput';
import { Checkbox } from '@/components/UI/checkbox/Checkbox';
import { useTaskContext } from '@/hooks/useTaskContext';

interface ITaskRow {
	task: ITask;
	index: number;
	isTemp?: boolean;
}

export function TaskRow({ task, index, isTemp = false }: ITaskRow) {
	const { register, control, watch } = useForm<TTaskFormState>({
		defaultValues: {
			name: task.name,
			isCompleted: task.isCompleted,
			dueDate: task.dueDate,
			priority: task.priority,
		},
	});

	const { setIdActiveDayColumn } = useTaskContext();

	const isCompleted = watch('isCompleted');

	const { deleteTask, isDeletePending } = useDeleteTask();

	useTaskDebounce({ watch, taskId: task.id });

	return (
		<Draggable
			key={task.id || 'temp'}
			draggableId={task.id || 'temp'}
			index={index}
			isDragDisabled={isCompleted || isTemp}
		>
			{(provided, snapshot) => (
				<li
					className={clsx(
						styles.wrapper,
						isCompleted && styles.completed,
						snapshot.isDragging && 'border',
					)}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div className={styles['left-row-items']}>
						<button
							className={clsx(
								styles['grip-button'],
								snapshot.isDragging && styles['grip-button-active'],
								isTemp && styles['button-temp'],
								(isCompleted || isTemp) && styles.isCompleted,
							)}
							disabled={isCompleted}
							{...(!isCompleted && !isTemp ? provided.dragHandleProps : {})}
						>
							<GripVertical className={styles['grip-icon']} />
						</button>
						<Controller
							control={control}
							name='isCompleted'
							render={({ field: { value, onChange } }) => (
								<Checkbox
									checked={value ?? false}
									onChange={onChange}
								/>
							)}
						/>
						<TransperentInput
							register={register}
							fieldName='name'
							disabled={isCompleted}
							className={isCompleted ? styles.isCompleted : ''}
						/>
					</div>

					<Controller
						control={control}
						name='dueDate'
						render={({ field: { value, onChange } }) => (
							<DatePicker
								value={value || ''}
								onChange={onChange}
								disabled={isCompleted}
								className={clsx(
									isCompleted && styles.isCompleted,
									styles['date-picker-wrapper'],
								)}
							/>
						)}
					/>

					<Controller
						control={control}
						name='priority'
						render={({ field: { value, onChange } }) => (
							<SingleSelect
								data={PRIORITY_SELECT}
								value={value || ''}
								onChange={onChange}
								disabled={isCompleted}
								className={clsx(
									isCompleted && styles.isCompleted,
									'flex-[0_0_90px] md:flex-[0_0_200px]',
								)}
							/>
						)}
					/>

					<button
						className={clsx(
							styles['delete-button'],
							isCompleted && styles.isCompleted,
						)}
						disabled={isCompleted || isDeletePending}
						onClick={() => {
							if (isTemp) {
								setIdActiveDayColumn('');
							} else {
								deleteTask(task.id);
							}
						}}
					>
						{isDeletePending ? (
							<Loader size={24} />
						) : (
							<Trash2 className={styles.icon} />
						)}
					</button>
				</li>
			)}
		</Draggable>
	);
}
