"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SecureInput } from "../ui/secure-input";
import { AxiosError } from "axios";
import { useRegister } from "@/hooks/auth/use-register";
import { useRoles } from "@/hooks/auth/use-roles";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z
      .string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z
      .string()
      .min(1, "L'adresse email est requise")
      .email("Adresse email invalide"),
    phone: z
      .string()
      .min(10, "Le numéro de téléphone doit contenir 10 chiffres")
      .max(10, "Le numéro de téléphone ne peut pas dépasser 10 caractères")
      .optional(),
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
    isActive: z.boolean(),
    roleId: z.string().min(1, "Le rôle est requis"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const registerMutation = useRegister();
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useRoles();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isActive: true,
      roleId: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        isActive: data.isActive,
        roleId: data.roleId,
      });
      toast.success("Inscription réussie !");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
      console.error("Registration error:", error);

      // Handle API errors
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data?.errors;
        if (apiErrors) {
          for (const [field, messages] of Object.entries(apiErrors)) {
            setError(field as keyof RegisterFormData, {
              type: "manual",
              message: (messages as string[]).join(", "),
            });
          }
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>Créez votre compte</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-7 mb-5">
          {/* Actif et Rôle */}
          <div className="flex flex-col space-y-7 md:flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                defaultChecked={true}
                onCheckedChange={(checked) =>
                  setValue("isActive", checked as boolean)
                }
              />
              <Label htmlFor="isActive" className="text-sm">
                Actif
              </Label>
            </div>
            <div className="space-y-2 w-full md:w-64">
              <Label htmlFor="role">Rôle</Label>
              <Select
                onValueChange={(value) => setValue("roleId", value)}
                disabled={rolesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      rolesLoading
                        ? "Chargement des rôles..."
                        : rolesError
                        ? "Erreur de chargement"
                        : "Sélectionnez un rôle"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {roles &&
                    Array.isArray(roles) &&
                    roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.roleId && (
                <p className="text-sm text-red-500">{errors.roleId.message}</p>
              )}
              {rolesError && (
                <p className="text-sm text-red-500">
                  Erreur lors du chargement des rôles
                </p>
              )}
            </div>
          </div>
          {/* Nom et Prénom */}
          <div className="grid grid-cols-1 space-y-7 md:space-y-0 md:grid-cols-5 gap-4">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Votre prénom"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Votre nom"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email et Téléphone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0343915428"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Mots de passe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <SecureInput
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
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
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-1/2 mx-auto">
            S'inscrire
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
