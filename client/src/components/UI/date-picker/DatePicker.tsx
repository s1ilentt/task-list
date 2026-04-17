'use client';

import { useOutside } from '@/hooks/useOutside';
import { useState } from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import styles from './DatePicker.module.scss';
import clsx from 'clsx';
import { DayPicker, OnSelectHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface IDatePicker {
	onChange: (value: string) => void;
	value: string;
	position?: 'left' | 'right';
	disabled?: boolean;
	className?: string;
	viewKanban?: boolean;
}

dayjs.extend(LocalizedFormat);

export function DatePicker({
	onChange,
	value,
	position = 'right',
	disabled = false,
	className,
	viewKanban = false,
}: IDatePicker) {
	const [selected, setSelected] = useState<Date | undefined>(new Date(value));
	const { isShow, setIsShow, ref } = useOutside(false);

	const handleDaySelect: OnSelectHandler<Date | undefined> = date => {
		const ISOdate = date
			? dayjs(date).format('YYYY-MM-DD[T]00:00:00.000[Z]')
			: undefined;

		setSelected(date);

		if (ISOdate) {
			onChange(ISOdate);
			setIsShow(false);
		} else {
			onChange('');
		}
	};

	return (
		<div
			className={clsx(
				`relative ${viewKanban ? '' : 'px-2 md:px-3'}`,
				className,
			)}
			ref={ref}
		>
			<button
				className={clsx(
					styles['picker-button'],
					viewKanban && styles['picker-button_canban'],
				)}
				disabled={disabled}
				onClick={() => setIsShow(prev => !prev)}
			>
				<span>{dayjs(value).format('LL')}</span>
			</button>
			{isShow && !disabled && (
				<div
					className={clsx(
						styles['day-picker-wrapper'],
						position === 'left'
							? '-left-4'
							: 'right-0 translate-x-1/3 md:-right-10 md:translate-x-0',
						viewKanban && styles['day-picker-wrapper_kanban'],
					)}
				>
					<DayPicker
						classNames={{
							caption_label: 'focus:outline-none focus:ring-0',
						}}
						animate
						autoFocus
						startMonth={new Date()}
						disabled={{ before: new Date() }}
						endMonth={new Date(2032, 11)}
						captionLayout='dropdown'
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
					/>
				</div>
			)}
		</div>
	);
}
