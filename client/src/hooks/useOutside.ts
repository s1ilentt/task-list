import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

interface IOutside {
	ref: any;
	isShow: boolean;
	setIsShow: Dispatch<SetStateAction<boolean>>;
}

export function useOutside(initialIsVisible: boolean): IOutside {
	const [isShow, setIsShow] = useState(initialIsVisible);
	const ref = useRef<HTMLElement>(null);

	const handleClickOutside = useCallback(
		(event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsShow(false);
			}
		},
		[ref],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	return { ref, isShow, setIsShow };
}
