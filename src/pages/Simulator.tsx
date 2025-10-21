import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import CounterDisplay from "@/components/CounterDisplay";
import ModeControls from "@/components/ModeControls";
import AIDecisionLog from "@/components/AIDecisionLog";
import ActivityChart from "@/components/ActivityChart";
import { useTheme } from "next-themes";

type Mode = 'up' | 'down' | 'mod' | 'ai' | null;

interface AIDecision {
  timestamp: string;
  decidedMode: 'up' | 'down' | 'mod';
  reason: string;
  confidence: number;
}

const Simulator = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [counter, setCounter] = useState(0);
  const [mode, setMode] = useState<Mode>(null);
  const [modN, setModN] = useState(10);
  const [recentActions, setRecentActions] = useState<('up' | 'down' | 'mod')[]>([]);
  const [aiDecisions, setAiDecisions] = useState<AIDecision[]>([]);
  const [activityCounts, setActivityCounts] = useState({
    up: 0,
    down: 0,
    mod: 0,
    ai: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  // Counter logic
  useEffect(() => {
    if (!isRunning || !mode) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (mode === 'up') {
          return prev + 1;
        } else if (mode === 'down') {
          return Math.max(0, prev - 1);
        } else if (mode === 'mod') {
          return (prev + 1) % modN;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, mode, modN]);

  // AI mode logic
  const analyzeAndDecide = (): 'up' | 'down' | 'mod' => {
    if (recentActions.length === 0) return 'up';

    const counts = {
      up: recentActions.filter(a => a === 'up').length,
      down: recentActions.filter(a => a === 'down').length,
      mod: recentActions.filter(a => a === 'mod').length,
    };

    const max = Math.max(counts.up, counts.down, counts.mod);
    const decidedMode = Object.entries(counts).find(([_, count]) => count === max)?.[0] as 'up' | 'down' | 'mod';
    
    const confidence = recentActions.length > 0 ? Math.round((max / recentActions.length) * 100) : 50;
    
    const reasons: Record<'up' | 'down' | 'mod', string> = {
      up: `User performed ${counts.up} UP actions out of last ${recentActions.length}`,
      down: `User performed ${counts.down} DOWN actions out of last ${recentActions.length}`,
      mod: `User performed ${counts.mod} MOD-N actions out of last ${recentActions.length}`,
    };

    const decision: AIDecision = {
      timestamp: new Date().toLocaleTimeString(),
      decidedMode,
      reason: reasons[decidedMode],
      confidence,
    };

    setAiDecisions(prev => [decision, ...prev].slice(0, 10));
    
    return decidedMode;
  };

  const handleModeChange = (newMode: Mode) => {
    if (newMode === 'ai') {
      const decidedMode = analyzeAndDecide();
      setMode(decidedMode);
      setActivityCounts(prev => ({ ...prev, ai: prev.ai + 1 }));
    } else {
      setMode(newMode);
      if (newMode) {
        setRecentActions(prev => [...prev, newMode].slice(-5));
        setActivityCounts(prev => ({ ...prev, [newMode]: prev[newMode] + 1 }));
      }
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setCounter(0);
    setMode(null);
    setIsRunning(false);
  };

  const handleModNChange = (n: number) => {
    setModN(n);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Counter and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <CounterDisplay value={counter} mode={mode} />
            <ModeControls
              onModeChange={handleModeChange}
              onReset={handleReset}
              onModNChange={handleModNChange}
              currentMode={mode}
              modNValue={modN}
            />
          </div>

          {/* Right Column - AI Log and Activity */}
          <div className="space-y-6">
            <AIDecisionLog decisions={aiDecisions} recentActions={recentActions} />
            <ActivityChart
              upCount={activityCounts.up}
              downCount={activityCounts.down}
              modCount={activityCounts.mod}
              aiCount={activityCounts.ai}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
