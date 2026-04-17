import { userService } from '@/services/user';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	});

	return { data, isLoading };
}
