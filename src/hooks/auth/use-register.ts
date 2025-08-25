import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";
import { CreateUserRequest, CreateUserResponse } from "@/types/auth";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      userData: CreateUserRequest
    ): Promise<CreateUserResponse> => {
      return post<CreateUserResponse>("/users", userData);
    },
    onSuccess: (data) => {
      console.log("User created successfully:", data);

      // Redirect to sign-in page after successful registration
      router.push("/login?message=registration-success");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      // Error handling is managed by the form component
      // You could also add toast notifications here if needed
    },
  });
}
