import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onRegister: (email: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular registro
    setTimeout(() => {
      toast({
        title: "¡Cuenta creada!",
        description: "Bienvenido a TechLearn AI. ¡Comienza tu aprendizaje!",
      });
      onRegister(email, name);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background/50"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-background/50"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-accent to-success hover:shadow-lg transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </form>
  );
};