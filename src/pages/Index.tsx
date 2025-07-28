import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { ChatInterface } from "@/components/ChatInterface";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, BarChart3, LogOut } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"auth" | "app">("auth");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [userProgress, setUserProgress] = useState({
    html: 25,
    css: 15,
    js: 10
  });
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const handleLogin = (email: string) => {
    setUser({ email, name: email.split("@")[0] });
    setCurrentView("app");
  };

  const handleRegister = (email: string, name: string) => {
    setUser({ email, name });
    setCurrentView("app");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
    setActiveTab("chat");
  };

  const handleUpdateProgress = (tech: string, points: number) => {
    setUserProgress(prev => ({
      ...prev,
      [tech]: Math.min(100, prev[tech as keyof typeof prev] + points)
    }));
  };

  if (currentView === "auth") {
    return (
      <AuthLayout
        title={authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        subtitle={authMode === "login" 
          ? "Continúa tu aprendizaje en desarrollo web" 
          : "Comienza tu journey en tecnología"
        }
      >
        {authMode === "login" ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">&lt;/&gt;</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tutorcito Riwi
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Hola, {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="chat" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat IA
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-0">
            <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center">
                  Aprende con IA - HTML, CSS & JavaScript
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface 
                  onUpdateProgress={handleUpdateProgress} 
                  chatHistory={chatHistory}
                  onSaveChatHistory={setChatHistory}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-0">
            <div className="max-w-6xl mx-auto">
              <Dashboard 
                userProgress={userProgress} 
                userName={user?.name || "Usuario"} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
