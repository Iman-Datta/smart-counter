import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, TrendingDown, Hash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIDecision {
  timestamp: string;
  decidedMode: 'up' | 'down' | 'mod';
  reason: string;
  confidence: number;
}

interface AIDecisionLogProps {
  decisions: AIDecision[];
  recentActions: ('up' | 'down' | 'mod')[];
}

const AIDecisionLog = ({ decisions, recentActions }: AIDecisionLogProps) => {
  const getModeIcon = (mode: 'up' | 'down' | 'mod') => {
    switch (mode) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'mod':
        return <Hash className="w-4 h-4 text-blue-600" />;
    }
  };

  const getModeColor = (mode: 'up' | 'down' | 'mod') => {
    switch (mode) {
      case 'up':
        return 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300';
      case 'down':
        return 'bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-300';
      case 'mod':
        return 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Decision Log
        </CardTitle>
        <CardDescription>
          Tracking the last 5 actions and AI predictions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recent Actions */}
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Recent Actions (Last 5)</h4>
          <div className="flex gap-2">
            {recentActions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No actions yet</p>
            ) : (
              recentActions.map((action, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getModeColor(action)}`}
                >
                  {getModeIcon(action)}
                  {action.toUpperCase()}
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Decisions */}
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">AI Decisions</h4>
          <ScrollArea className="h-[200px] pr-4">
            {decisions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No AI decisions yet. Use AI Mode to see predictions.</p>
            ) : (
              <div className="space-y-3">
                {decisions.map((decision, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted/50 border border-border animate-slide-in"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getModeIcon(decision.decidedMode)}
                        <span className="font-semibold text-sm">
                          Switched to {decision.decidedMode.toUpperCase()} Mode
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{decision.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{decision.reason}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Confidence:</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all"
                          style={{ width: `${decision.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{decision.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDecisionLog;
