import { ITimerRound } from '@/types/timer.interfaces';
import styles from './TimerProgressButtons.module.scss';
import clsx from 'clsx';
import { useTimerActions } from '@/hooks/timer/useTimerActions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ITimerProgressButtons {
	rounds: ITimerRound[] | undefined;
	activeRound: ITimerRound | undefined;
}

export function TimerProgressButtons({
	rounds,
	activeRound,
}: ITimerProgressButtons) {
	const { nextRoundHandler, prevRoundHandler } = useTimerActions();
	const activeRoundIndex =
		rounds?.findIndex(round => round.id === activeRound?.id) || 0;
	const buttonWidth = rounds?.length ? `${65 / rounds.length}%` : 0;

	return (
		<div className={styles.wrapper}>
			{rounds?.length && activeRound ? (
				<>
					<button
						className={styles.button}
						disabled={activeRoundIndex <= 0}
						onClick={prevRoundHandler}
					>
						<ChevronLeft
							size={21}
							className={styles.icon}
						/>
					</button>
					<div className={styles['display-round-wrapper']}>
						{rounds?.map(round => (
							<div
								key={round.id}
								style={{
									flexBasis: buttonWidth,
								}}
								className={clsx(styles['display-round'], {
									[styles.completed]: round.isCompleted,
									[styles.active]: round.id === activeRound.id,
								})}
							></div>
						))}
					</div>
					<button
						disabled={activeRoundIndex >= rounds.length - 1}
						className={styles.button}
						onClick={nextRoundHandler}
					>
						<ChevronRight
							size={21}
							className={styles.icon}
						/>
					</button>
				</>
			) : null}
		</div>
	);
}
