"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { GoogleButton } from "@/components/ui/googleButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import Script from "next/script";
import Image from "next/image";
type AuthMode = "login" | "register";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula uma requisição
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // Simula autenticação com Google
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 lg:hidden">
          <Image
            src="/logo-par-perfeito-png.png"
            alt="Descrição da imagem"
            width={300}
            height={300}
          />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {mode === "login"
            ? "Entre com suas credenciais para acessar sua conta"
            : "Preencha os dados abaixo para começar"}
        </p>
      </div>
      {/* Tabs */}
      <div className="flex bg-secondary rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            mode === "login"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            mode === "register"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Criar conta
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                className="pl-10 h-11 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10 h-11 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Senha
            </Label>
            {mode === "login" && (
              <button
                type="button"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Esqueceu a senha?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mode === "register" && (
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirmar senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processando...
            </span>
          ) : (
            <span className="flex justify-center items-center gap-2">
              {mode === "login" ? "Entrar" : "Criar conta"}
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>
      {/* Google Button */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.google) {
            window.google.accounts.id.initialize({
              client_id: "SEU_CLIENT_ID",
              callback: (response: any) => {
                console.log(response);
              },
            });

            window.google.accounts.id.renderButton(
              document.getElementById("googleButton"),
              {
                theme: "outline",
                size: "large",
                text: "continue_with",
              },
            );
          }
        }}
      />

      <GoogleButton />

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Ao continuar, você concorda com nossos{" "}
        <button type="button" className="text-primary hover:underline">
          Termos de Serviço
        </button>{" "}
        e{" "}
        <button type="button" className="text-primary hover:underline">
          Política de Privacidade
        </button>
      </p>
    </div>
  );
}
