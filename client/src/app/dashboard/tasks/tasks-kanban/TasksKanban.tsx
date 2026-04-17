'use client';

import { Loader } from '@/components/UI/loader/Loader';
import { useTasks } from '@/hooks/tasks-list/useTasks';
import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTaskDnd } from '@/hooks/tasks-list/useTaskDnd';
import { DayColumn } from './day-column/DayColumn';
import { useTasksByDate } from '@/hooks/tasks-list/useTasksByDate';
import styles from './TasksKanban.module.scss';
import { useDaysKanban } from '@/hooks/tasks-list/useDaysKanban';
import dayjs from 'dayjs';
import ScrollConteiner from 'react-indiana-drag-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

const EMPTY_TASKS: any[] = [];

export function TasksKanban() {
	const [startDay, setStartDay] = useState(dayjs().format('YYYY-MM-DD'));
	const [isDragging, setIsDragging] = useState(false);

	const { kanbanDays } = useDaysKanban(startDay);
	const { data: tasks, isPending } = useTasks();
	const tasksByDate = useTasksByDate(tasks);

	const onDragEnd = useTaskDnd(() => setIsDragging(false));

	useEffect(() => {
		const mainLayout = document.querySelector('main');
		mainLayout?.classList.add('no-padding');
		document.body?.classList.add('overflow-hidden');

		return () => {
			mainLayout?.classList.remove('no-padding');
			document.body?.classList.remove('overflow-hidden');
		};
	}, []);

	if (isPending)
		return (
			<div className='flex items-center justify-center h-[80vh]'>
				<Loader />
			</div>
		);

	return (
		<section className={styles.section}>
			<div className='flex justify-end pr-8 md:pr-15 pb-2'>
				<div className={styles['switch-week']}>
					<button
						className='px-1.5'
						onClick={() =>
							setStartDay(prev =>
								dayjs(prev, 'YYYY-MM-DD')
									.subtract(7, 'day')
									.format('YYYY-MM-DD'),
							)
						}
						disabled={dayjs(startDay, 'YYYY-MM-DD').isToday()}
					>
						<ChevronLeft size={16} />
					</button>
					<button
						className='py-1'
						onClick={() => setStartDay(dayjs().format('YYYY-MM-DD'))}
					>
						<span className='inline-block border-x border-border px-4 text-[15px] leading-none'>
							Today
						</span>
					</button>
					<button
						className='px-1.5'
						onClick={() =>
							setStartDay(prev =>
								dayjs(prev, 'YYYY-MM-DD').add(7, 'day').format('YYYY-MM-DD'),
							)
						}
					>
						<ChevronRight size={16} />
					</button>
				</div>
			</div>
			{kanbanDays ? (
				<>
					<DragDropContext
						onDragEnd={onDragEnd}
						onDragStart={() => setIsDragging(true)}
					>
						<ScrollConteiner
							ignoreElements='li'
							className={styles['days-list']}
							nativeMobileScroll={true}
							hideScrollbars={false}
							vertical={!isDragging}
							horizontal={!isDragging}
							activationDistance={10}
						>
							{kanbanDays.map(day => (
								<DayColumn
									key={day.id}
									day={day}
									dayTasks={tasksByDate[day.id] || EMPTY_TASKS}
								/>
							))}
						</ScrollConteiner>
					</DragDropContext>
				</>
			) : (
				<h2>Date not defined</h2>
			)}
		</section>
	);
}
