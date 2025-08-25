import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Vérifier si l'utilisateur est déjà connecté
  const session = await getServerSession(authOptions);
  
  if (session) {
    // Rediriger vers le dashboard si déjà connecté
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 text-transparent bg-clip-text mb-4">
            CourrierPlus
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Une solution moderne et sécurisée pour la gestion de votre courrier
          </p>
        </div>

        <div className="mt-8">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="font-medium hover:underline transition-all"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
