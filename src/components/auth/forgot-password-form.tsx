"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";
// import Input from "@/components/ui/input";
// import Button from "@/components/ui/button";
// import Link from "@/components/ui/link";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import { ApiError } from "@/lib/api";
import { Button, Input, Label } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse email est requise")
    .email("Adresse email invalide"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        email: data.email,
      });

      setSubmittedEmail(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Forgot password error:", error);

      if (error instanceof ApiError) {
        // Handle specific API errors
        switch (error.status) {
          case 404:
            setError("email", {
              message:
                "Cette adresse email n'est pas associée à un compte existant",
            });
            break;
          case 400:
            setError("email", { message: "Adresse email invalide" });
            break;
          default:
            setError("root", {
              message: "Une erreur est survenue. Veuillez réessayer.",
            });
        }
      } else {
        setError("root", {
          message: "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    }
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    reset();
  };

  if (emailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Email envoyé !</CardTitle>
          <CardDescription>
            Un email de récupération a été envoyé à{" "}
            <span className="font-medium">{submittedEmail}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          <p>Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.</p>
          <p className="mt-2">Si vous ne recevez pas l'email dans quelques minutes, vérifiez votre dossier spam.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button className="w-full" onClick={handleResendEmail}>
            Renvoyer l&apos;email
          </Button>
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5 mb-5">
          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "Envoi en cours..." : "Envoyer le lien de récupération"}
          </Button>
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
