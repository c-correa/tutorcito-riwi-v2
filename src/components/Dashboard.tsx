import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Award, Eye } from "lucide-react";
import { TechModal } from "./TechModal";

interface UserProgress {
  html: number;
  css: number;
  js: number;
}

interface DashboardProps {
  userProgress: UserProgress;
  userName: string;
}

export const Dashboard = ({ userProgress, userName }: DashboardProps) => {
  const [selectedTech, setSelectedTech] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const technologies = [
    {
      name: "HTML",
      key: "html" as keyof UserProgress,
      color: "html",
      icon: "🏗️",
      description: "Estructura y semántica web"
    },
    {
      name: "CSS",
      key: "css" as keyof UserProgress,
      color: "css", 
      icon: "🎨",
      description: "Diseño y presentación"
    },
    {
      name: "JavaScript",
      key: "js" as keyof UserProgress,
      color: "js",
      icon: "⚡",
      description: "Interactividad y lógica"
    }
  ];

  const handleOpenModal = (tech: any) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const getProgressLevel = (progress: number) => {
    if (progress >= 80) return { level: "Avanzado", color: "success" };
    if (progress >= 50) return { level: "Intermedio", color: "warning" };
    if (progress >= 20) return { level: "Principiante", color: "info" };
    return { level: "Inicial", color: "muted" };
  };

  const getStrengthsAndWeaknesses = () => {
    const sorted = technologies.sort((a, b) => userProgress[b.key] - userProgress[a.key]);
    const strengths = sorted.slice(0, 1);
    const weaknesses = sorted.slice(-1);
    
    return { strengths, weaknesses };
  };

  const getImprovementPlan = () => {
    const { weaknesses } = getStrengthsAndWeaknesses();
    const weakest = weaknesses[0];
    
    const plans = {
      html: [
        "Practica elementos semánticos (header, nav, main, footer)",
        "Aprende sobre accesibilidad web y etiquetas ARIA",
        "Domina formularios y validación HTML5"
      ],
      css: [
        "Practica Flexbox y CSS Grid para layouts",
        "Aprende sobre responsive design y media queries",
        "Domina animaciones y transiciones CSS"
      ],
      js: [
        "Practica manipulación del DOM y eventos",
        "Aprende async/await y manejo de APIs",
        "Domina ES6+ y programación funcional"
      ]
    };

    return plans[weakest.key] || [];
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();
  const improvementPlan = getImprovementPlan();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {userName}! 👋</h1>
        <p className="text-muted-foreground">Aquí está tu progreso en desarrollo web</p>
      </div>

      {/* Progress Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {technologies.map((tech) => {
          const progress = userProgress[tech.key];
          const level = getProgressLevel(progress);
          
          return (
            <Card key={tech.key} className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`${
                      level.color === "success" ? "bg-success/20 text-success" :
                      level.color === "warning" ? "bg-warning/20 text-warning" :
                      level.color === "info" ? "bg-info/20 text-info" :
                      "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    {level.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-2 ${
                      tech.key === "html" ? "[&>div]:bg-html" :
                      tech.key === "css" ? "[&>div]:bg-css" :
                      "[&>div]:bg-js"
                    }`}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleOpenModal(tech)}
                  className="w-full mt-3 gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analysis Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <Card className="border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="w-5 h-5" />
              Puntos Fuertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.map((tech) => (
              <div key={tech.key} className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  {userProgress[tech.key]}%
                </Badge>
              </div>
            ))}
            <p className="text-sm text-muted-foreground mt-3">
              ¡Excelente trabajo! Sigue así y ayuda a otros en esta área.
            </p>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <TrendingDown className="w-5 h-5" />
              Áreas de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weaknesses.map((tech) => (
              <div key={tech.key} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </div>
                <Badge variant="secondary" className="bg-warning/20 text-warning">
                  {userProgress[tech.key]}%
                </Badge>
              </div>
            ))}
            <p className="text-sm text-muted-foreground mt-3">
              Enfócate en esta área para un crecimiento equilibrado.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Plan */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Target className="w-5 h-5" />
            Plan de Mejora Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {improvementPlan.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-sm flex-1">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-accent font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Tip: Practica 30 minutos diarios para ver mejoras significativas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tech Modal */}
      {selectedTech && (
        <TechModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          technology={selectedTech}
          progress={userProgress[selectedTech.key]}
        />
      )}
    </div>
  );
};