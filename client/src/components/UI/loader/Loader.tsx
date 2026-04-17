interface ILoader {
	className?: string;
	size?: number;
}

export function Loader({ size = 30, className }: ILoader) {
	return (
		<div
			style={{ width: size, height: size }}
			className={`animate-spin rounded-full border-2 border-gray-600
				 border-t-gray-300 ${className}`}
		/>
	);
}
