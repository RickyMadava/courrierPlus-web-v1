'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLogin } from '@/services/auth.service';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success('Connexion réussie !');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Connectez-vous à votre compte</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}