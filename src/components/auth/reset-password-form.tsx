"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { SecureInput } from "../ui/secure-input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/auth/use-reset-password";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Token de réinitialisation manquant");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        password: data.password,
        passwordConfirmation: data.confirmPassword
      });

      setIsSuccess(true);
      toast.success("Mot de passe réinitialisé avec succès !");

      // Redirection vers login après 3 secondes
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la réinitialisation"
      );
    }
  };

  // Si pas de token, afficher une erreur
  if (!token) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">Lien invalide</CardTitle>
          <CardDescription>
            Ce lien de réinitialisation est invalide ou a expiré.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          <p>Veuillez demander un nouveau lien de réinitialisation.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Link href="/forgot-password" className="w-full">
            <Button className="w-full">Demander un nouveau lien</Button>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">
            Mot de passe réinitialisé !
          </CardTitle>
          <CardDescription>
            Votre mot de passe a été mis à jour avec succès
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          <p>
            Vous allez être redirigé vers la page de connexion dans quelques
            secondes...
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full">Aller à la connexion</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Nouveau mot de passe</CardTitle>
        <CardDescription>Entrez votre nouveau mot de passe</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5 mb-5">
          <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <SecureInput
              id="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <SecureInput
              id="confirmPassword"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending
              ? "Réinitialisation..."
              : "Réinitialiser le mot de passe"}
          </Button>
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
