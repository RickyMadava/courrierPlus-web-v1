import { LoginForm } from "@/components/auth/login-form";
import { LogoutButton } from "@/components/auth/logout-button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Courrier Plus
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Une solution moderne et sécurisée pour la gestion de votre courrier
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Interface Moderne</h3>
            <p className="text-gray-600">Design intuitif et responsive</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Sécurisé</h3>
            <p className="text-gray-600">Standards OWASP intégrés</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Performant</h3>
            <p className="text-gray-600">Next.js 15 et TypeScript</p>
          </div>
        </div>

        <div className="mt-8">
          <LogoutButton />
          <LoginForm />
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Stack: Next.js 15 • TypeScript • Shadcn/ui • React Query • Zustand
          </p>
        </div>
      </div>
    </div>
  );
}
