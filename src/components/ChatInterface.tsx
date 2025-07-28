import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  technologies?: string[];
}

interface ChatInterfaceProps {
  onUpdateProgress: (tech: string, points: number) => void;
}

export const ChatInterface = ({ onUpdateProgress }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente de aprendizaje de tecnologías web. Puedo ayudarte con HTML, CSS y JavaScript. ¿En qué te gustaría mejorar hoy?",
      sender: "ai",
      timestamp: new Date(),
      technologies: ["html", "css", "js"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let content = "";
    let technologies: string[] = [];

    if (lowerMessage.includes("html")) {
      technologies.push("html");
      content = "¡Excelente! HTML es la estructura de toda página web. Te recomiendo practicar con elementos semánticos como <header>, <nav>, <main>, <section> y <footer>. ¿Te gustaría que revisemos algún concepto específico de HTML?";
      onUpdateProgress("html", 10);
    } else if (lowerMessage.includes("css")) {
      technologies.push("css");
      content = "¡CSS es genial! Es lo que hace que las páginas web se vean hermosas. Te sugiero practicar Flexbox, Grid y animaciones CSS. ¿Hay algún concepto de CSS que te resulte difícil?";
      onUpdateProgress("css", 10);
    } else if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
      technologies.push("js");
      content = "¡JavaScript es el corazón de la interactividad web! Te recomiendo dominar conceptos como funciones, eventos del DOM, async/await y ES6+. ¿Qué aspecto de JavaScript te gustaría explorar?";
      onUpdateProgress("js", 10);
    } else if (lowerMessage.includes("proyecto") || lowerMessage.includes("práctica")) {
      technologies = ["html", "css", "js"];
      content = "¡Perfecto! Los proyectos son la mejor forma de aprender. Te sugiero crear una landing page responsive que combine HTML semántico, CSS Grid/Flexbox y JavaScript para interactividad. ¿Te parece bien empezar con algo así?";
      onUpdateProgress("html", 5);
      onUpdateProgress("css", 5);
      onUpdateProgress("js", 5);
    } else {
      content = "Entiendo que quieres aprender más sobre desarrollo web. ¿Podrías ser más específico sobre HTML, CSS o JavaScript? También puedo sugerirte proyectos prácticos para combinar estas tecnologías.";
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "ai",
      timestamp: new Date(),
      technologies
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simular delay de IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === "ai" 
                ? "bg-gradient-to-r from-primary to-accent" 
                : "bg-muted"
            }`}>
              {message.sender === "ai" ? (
                <Bot className="w-4 h-4 text-primary-foreground" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            
            <Card className={`max-w-[80%] p-3 ${
              message.sender === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card"
            }`}>
              <p className="text-sm">{message.content}</p>
              {message.technologies && (
                <div className="flex gap-1 mt-2">
                  {message.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className={`text-xs ${
                        tech === "html" ? "bg-html/20 text-html" :
                        tech === "css" ? "bg-css/20 text-css" :
                        tech === "js" ? "bg-js/20 text-js" :
                        ""
                      }`}
                    >
                      {tech.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <Card className="bg-card p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregunta sobre HTML, CSS o JavaScript..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-accent"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};