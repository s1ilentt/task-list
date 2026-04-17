import styles from './CircleProgressBar.module.scss';

interface ICircleProgressBar {
	totalTasks: number;
	completedTasks: number;
	size?: number;
	strokeWidth?: number;
	differenceStroke?: number;
}

export function CircleProgressBar({
	totalTasks,
	completedTasks,
	size = 140,
	strokeWidth = 12,
	differenceStroke = 2,
}: ICircleProgressBar) {
	const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percent / 100) * circumference;

	const center = size / 2;

	return (
		<svg
			width={size}
			height={size}
		>
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke='#cccccc'
				strokeWidth={strokeWidth - differenceStroke}
				fill='transparent'
			/>
			<circle
				className={styles.circle}
				cx={center}
				cy={center}
				strokeWidth={strokeWidth}
				r={radius}
				fill='transparent'
				style={{
					strokeDasharray: circumference,
					strokeDashoffset: offset,
				}}
			/>
			<text
				className={styles.text}
				x={center}
				y={center}
				textAnchor='middle'
				dominantBaseline='middle'
			>
				{`${completedTasks < 10 ? '0' : ''}${completedTasks}/${
					totalTasks < 10 ? '0' : ''
				}${totalTasks}`}
			</text>
		</svg>
	);
}
