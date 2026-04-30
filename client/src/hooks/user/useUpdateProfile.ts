import { userService } from '@/services/user';
import { TUserForm } from '@/types/auth.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	const { mutate: updateProfile, isPending: isUpdating } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (formData: TUserForm) => userService.update(formData),
		onSuccess() {
			toast.success('Profile data has been updated successfully');

			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});

	return { updateProfile, isUpdating };
}
