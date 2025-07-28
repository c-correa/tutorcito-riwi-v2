import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";

interface Technology {
  name: string;
  key: string;
  color: string;
  icon: string;
  description: string;
}

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  technology: Technology;
  progress: number;
}

export const TechModal = ({ isOpen, onClose, technology, progress }: TechModalProps) => {
  const getProgressLevel = (progress: number) => {
    if (progress >= 80) return { level: "Avanzado", color: "success" };
    if (progress >= 50) return { level: "Intermedio", color: "warning" };
    if (progress >= 20) return { level: "Principiante", color: "info" };
    return { level: "Inicial", color: "muted" };
  };

  const getStrengthsAndWeaknesses = () => {
    const level = getProgressLevel(progress);
    
    const strengthsMap = {
      html: {
        advanced: ["Dominio de elementos semánticos", "Excelente estructura de documentos", "Conocimiento profundo de accesibilidad"],
        intermediate: ["Uso correcto de etiquetas", "Estructura básica bien organizada"],
        beginner: ["Conocimiento de etiquetas básicas"],
        initial: ["Conceptos fundamentales en desarrollo"]
      },
      css: {
        advanced: ["Maestría en Flexbox y Grid", "Animaciones complejas", "Responsive design avanzado"],
        intermediate: ["Layouts responsivos", "Uso de selectores avanzados"],
        beginner: ["Estilos básicos", "Conocimiento de propiedades fundamentales"],
        initial: ["Conceptos de diseño web básicos"]
      },
      js: {
        advanced: ["Programación asíncrona", "Manipulación avanzada del DOM", "Arquitectura de aplicaciones"],
        intermediate: ["Manejo de eventos", "Funciones y objetos"],
        beginner: ["Sintaxis básica", "Variables y tipos de datos"],
        initial: ["Lógica de programación básica"]
      }
    };

    const weaknessesMap = {
      html: {
        advanced: ["Optimización de SEO avanzado"],
        intermediate: ["Elementos semánticos avanzados", "Accesibilidad web"],
        beginner: ["Formularios complejos", "Elementos semánticos"],
        initial: ["Estructura básica de HTML", "Etiquetas fundamentales"]
      },
      css: {
        advanced: ["CSS-in-JS y metodologías avanzadas"],
        intermediate: ["Animaciones CSS", "Grid avanzado"],
        beginner: ["Flexbox y Grid", "Media queries"],
        initial: ["Selectores CSS", "Propiedades básicas de layout"]
      },
      js: {
        advanced: ["Patrones de diseño avanzados"],
        intermediate: ["Async/await", "ES6+ features"],
        beginner: ["Manipulación del DOM", "Eventos"],
        initial: ["Estructuras de control", "Funciones básicas"]
      }
    };

    const levelKey = level.level.toLowerCase() === "avanzado" ? "advanced" :
                     level.level.toLowerCase() === "intermedio" ? "intermediate" :
                     level.level.toLowerCase() === "principiante" ? "beginner" : "initial";

    return {
      strengths: strengthsMap[technology.key as keyof typeof strengthsMap]?.[levelKey] || [],
      weaknesses: weaknessesMap[technology.key as keyof typeof weaknessesMap]?.[levelKey] || []
    };
  };

  const getImprovementPlan = () => {
    const plans = {
      html: [
        "Practica elementos semánticos (header, nav, main, footer)",
        "Aprende sobre accesibilidad web y etiquetas ARIA",
        "Domina formularios y validación HTML5",
        "Optimiza para SEO con meta tags apropiados"
      ],
      css: [
        "Practica Flexbox y CSS Grid para layouts",
        "Aprende sobre responsive design y media queries", 
        "Domina animaciones y transiciones CSS",
        "Explora metodologías como BEM y CSS Modules"
      ],
      js: [
        "Practica manipulación del DOM y eventos",
        "Aprende async/await y manejo de APIs",
        "Domina ES6+ y programación funcional",
        "Construye proyectos con arquitectura escalable"
      ]
    };

    return plans[technology.key as keyof typeof plans] || [];
  };

  const level = getProgressLevel(progress);
  const { strengths, weaknesses } = getStrengthsAndWeaknesses();
  const improvementPlan = getImprovementPlan();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">{technology.icon}</span>
            <div>
              <span>{technology.name}</span>
              <p className="text-sm font-normal text-muted-foreground">{technology.description}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nivel de Competencia</span>
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
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-3 ${
                      technology.key === "html" ? "[&>div]:bg-html" :
                      technology.key === "css" ? "[&>div]:bg-css" :
                      "[&>div]:bg-js"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="border-success/20 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                Puntos Fuertes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-success/10 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span className="text-sm flex-1">{strength}</span>
                  </div>
                ))}
              </div>
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
              <div className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-warning/10 rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <span className="text-sm flex-1">{weakness}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
                  Tip: Practica 30 minutos diarios para ver mejoras significativas en {technology.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};