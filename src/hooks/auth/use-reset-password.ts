import { useMutation } from '@tanstack/react-query';
import { post } from '@/lib/api';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/types/auth';

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await post<ResetPasswordResponse>('/auth/reset-password', data);
      return response;
    },
    onError: (error) => {
      console.error('Reset password error:', error);
      // Error handling is managed by the form component
    },
  });
}