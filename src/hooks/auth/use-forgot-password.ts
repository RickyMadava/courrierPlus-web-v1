import { useMutation } from '@tanstack/react-query';
import { post } from '@/lib/api';
import { ForgetPasswordRequest, ResetPasswordResponse } from '@/types/auth';

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgetPasswordRequest) => {
      const response = await post<ResetPasswordResponse>('/auth/forgot-password', data);
      return response;
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
      // Error handling is managed by the form component
    },
  });
}