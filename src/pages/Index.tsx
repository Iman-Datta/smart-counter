import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, TrendingUp, TrendingDown, Hash } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Self-Learning Digital Counter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An intelligent counter simulator that adapts its behavior based on your usage patterns
          </p>
        </header>

        {/* Project Description Card */}
        <Card className="max-w-3xl mx-auto mb-12 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              Project Objective
            </CardTitle>
            <CardDescription>
              Demonstrating adaptive AI logic in digital electronics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              This interactive simulator demonstrates how artificial intelligence can be applied to traditional 
              digital electronics. The counter operates in multiple modes and intelligently learns from your 
              behavior to predict which mode you prefer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-green-900 dark:text-green-100">Up Counter</h3>
                  <p className="text-xs text-green-700 dark:text-green-300">Increments sequentially</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <TrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-red-900 dark:text-red-100">Down Counter</h3>
                  <p className="text-xs text-red-700 dark:text-red-300">Decrements sequentially</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <Hash className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100">Mod-N Counter</h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Counts within 0 to N</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            onClick={() => navigate('/simulator')}
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Open Simulator
          </Button>
        </div>

        {/* Quick Links */}
        <div className="max-w-3xl mx-auto mt-12 flex justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="outline" onClick={() => navigate('/about')}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
