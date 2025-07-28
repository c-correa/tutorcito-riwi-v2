import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">&lt;/&gt;</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechLearn AI
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};