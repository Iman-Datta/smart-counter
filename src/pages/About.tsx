import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Cpu, GitBranch, Brain, Code2 } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-2">About This Project</h1>
          <p className="text-xl text-muted-foreground">
            Understanding Self-Learning Digital Counters
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Digital Counter Basics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                What is a Digital Counter?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                A digital counter is a sequential logic circuit that counts input pulses and displays 
                the count in binary or decimal form. It's a fundamental component in digital electronics 
                used in applications like frequency dividers, timekeeping, and event counting.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Key Characteristics:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Sequential logic circuit</li>
                  <li>Synchronous or asynchronous operation</li>
                  <li>Uses flip-flops for state storage</li>
                  <li>Can be designed for various counting sequences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Counter Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-green-600" />
                Types of Counters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">Up Counter</h4>
                <p className="text-muted-foreground">
                  Increments the count by 1 on each clock pulse. Used in applications requiring 
                  sequential counting from 0 upwards.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">Down Counter</h4>
                <p className="text-muted-foreground">
                  Decrements the count by 1 on each clock pulse. Useful for countdown timers 
                  and reverse sequence applications.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Mod-N Counter</h4>
                <p className="text-muted-foreground">
                  Counts from 0 to N-1, then resets. The modulus (N) determines the counting range. 
                  Essential for frequency division and custom counting sequences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Integration */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Adaptive AI Logic in Digital Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                This project demonstrates how machine learning concepts can be applied to traditional 
                digital electronics. The AI mode observes user behavior patterns and adapts the counter's 
                operation mode accordingly.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">How It Works:</h4>
                <ol className="list-decimal list-inside space-y-2 text-purple-700 dark:text-purple-300">
                  <li>System tracks the last 5 user-selected modes</li>
                  <li>AI analyzes the pattern distribution (Up, Down, Mod-N)</li>
                  <li>Selects the most frequently used mode</li>
                  <li>Provides confidence score based on pattern strength</li>
                  <li>Logs decisions with timestamps for transparency</li>
                </ol>
              </div>
              <p className="text-muted-foreground">
                This simple learning algorithm mimics basic pattern recognition found in more complex 
                AI systems, demonstrating how adaptive behavior can enhance traditional hardware designs.
              </p>
            </CardContent>
          </Card>

          {/* FSM Concept */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-orange-600" />
                Finite State Machine (FSM)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Digital counters are implemented as Finite State Machines, where each count value 
                represents a distinct state. The FSM transitions between states based on clock pulses 
                and control signals.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">State Transitions:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Each state corresponds to a counter value</li>
                  <li>Transitions occur on clock edges</li>
                  <li>Mode selection determines transition direction</li>
                  <li>Reset signal returns to initial state (0)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tools Used */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                Technologies Used
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">React</h4>
                  <p className="text-xs text-muted-foreground">UI framework with hooks</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Vite</h4>
                  <p className="text-xs text-muted-foreground">Fast build tool</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Tailwind CSS</h4>
                  <p className="text-xs text-muted-foreground">Utility-first styling</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">TypeScript</h4>
                  <p className="text-xs text-muted-foreground">Type-safe development</p>
                </div>
              </div>
              <p className="text-muted-foreground pt-2">
                The AI logic is simulated using pattern recognition algorithms implemented in TypeScript, 
                demonstrating basic machine learning principles without external ML libraries.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate('/simulator')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Try the Simulator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
