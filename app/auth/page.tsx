import { AuthForm } from "@/components/auth-form";
import Image from "next/image";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div>
            <Image
              src="/logo-par-perfeito-png.png"
              alt="Descrição da imagem"
              width={300}
              height={300}
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Par Perfeito
          </h1>
          <p className="text-muted-foreground text-lg">
            Encontre a combinação ideal
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex bg-card items-center justify-center p-6 lg:p-12">
        <AuthForm />
      </div>
    </main>
  );
}
