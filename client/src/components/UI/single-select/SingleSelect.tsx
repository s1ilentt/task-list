'use client';

import { useOutside } from '@/hooks/useOutside';
import clsx from 'clsx';
import { MouseEvent } from 'react';
import { Badge } from '../badge/Badge';
import { X } from 'lucide-react';
import styles from './SingleSelect.module.scss';

export interface IOptions {
	label: string;
	value: string;
}

interface ISingleSelect {
	data: IOptions[];
	onChange: (value: string) => void;
	value: string;
	isColorSelect?: boolean;
	disabled?: boolean;
	className?: string;
	viewKanban?: boolean;
}

export function SingleSelect({
	data,
	onChange,
	value,
	isColorSelect,
	disabled = false,
	className,
	viewKanban = false,
}: ISingleSelect) {
	const { ref, isShow, setIsShow } = useOutside(false);

	const getValue = () => data.find(item => item.value === value)?.value;

	const handleButtonSelectOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsShow(prev => !prev);
	};

	const handleButtonClearClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onChange('');
	};

	return (
		<div
			className={clsx(
				styles.wrapper,
				isColorSelect && 'w-max',
				className,
				viewKanban && styles['wrapper_kanban'],
			)}
			ref={ref}
		>
			<button
				className={clsx(
					styles['button-to-select'],
					viewKanban && styles['button-to-select_kanban'],
				)}
				disabled={disabled}
				onClick={handleButtonSelectOptionClick}
			>
				{getValue() ? (
					<Badge
						priority={value}
						className={'capitalize'}
						style={isColorSelect ? { backgroundColor: value } : {}}
						viewKanban={viewKanban}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge viewKanban={viewKanban}>
						{isColorSelect ? 'Click for select' : 'Priority'}
					</Badge>
				)}
			</button>

			{value && !disabled && (
				<button
					className={clsx(
						styles['hide-button'],
						viewKanban && styles['hide-button_kanban'],
					)}
					onClick={handleButtonClearClick}
				>
					<X size={18} />
				</button>
			)}

			{isShow && !disabled && (
				<div
					className={clsx(
						styles['select-list'],
						viewKanban && styles['select-list_kanban'],
					)}
				>
					{data.map(item => (
						<button
							key={item.value}
							onClick={(e: MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								onChange(item.value);
								setIsShow(false);
							}}
							className={styles['select-item']}
							style={
								isColorSelect
									? {
											backgroundColor: item.value,
										}
									: {}
							}
						>
							<Badge
								priority={item.value}
								viewKanban={viewKanban}
							>
								{item.label}
							</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
