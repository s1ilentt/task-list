import clsx from 'clsx';
import { TView } from '../TaskDisplay';
import styles from './ViewSwitcher.module.scss';
import { List, SquareKanban } from 'lucide-react';

interface IViewSwithcer {
	currentType: TView;
	setType: (value: TView) => void;
}

export function ViewSwitcher({ currentType, setType }: IViewSwithcer) {
	return (
		<div
			className={clsx(
				styles.wrapper,
				currentType === 'kanban' && 'pl-3 md:pl-5 lg:pl-7.5',
			)}
		>
			<button
				className={currentType === 'list' ? styles.active : undefined}
				onClick={() => setType('list')}
			>
				<List size={22} />
				<span>List</span>
			</button>
			<button
				className={currentType === 'kanban' ? styles.active : undefined}
				onClick={() => setType('kanban')}
			>
				<SquareKanban size={22} />
				<span>Board</span>
			</button>
		</div>
	);
}
