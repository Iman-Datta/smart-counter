import { cn } from "@/lib/utils";

interface CounterDisplayProps {
  value: number;
  mode: 'up' | 'down' | 'mod' | 'ai' | null;
  className?: string;
}

const CounterDisplay = ({ value, mode, className }: CounterDisplayProps) => {
  const getModeColor = () => {
    switch (mode) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'mod':
        return 'text-blue-600 dark:text-blue-400';
      case 'ai':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-foreground';
    }
  };

  const getModeGlow = () => {
    switch (mode) {
      case 'up':
        return 'shadow-[0_0_30px_rgba(34,197,94,0.3)]';
      case 'down':
        return 'shadow-[0_0_30px_rgba(239,68,68,0.3)]';
      case 'mod':
        return 'shadow-[0_0_30px_rgba(59,130,246,0.3)]';
      case 'ai':
        return 'shadow-[0_0_30px_rgba(168,85,247,0.3)]';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center p-12 rounded-2xl bg-gradient-to-br from-card to-card/80 border-2 transition-all duration-300",
      getModeGlow(),
      mode ? 'border-opacity-50' : 'border-border',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-transparent rounded-2xl" />
      <div className={cn(
        "relative text-9xl font-mono font-bold tabular-nums tracking-wider transition-all duration-300 animate-counter-flip",
        getModeColor()
      )}>
        {String(value).padStart(3, '0')}
      </div>
      {mode && (
        <div className={cn(
          "absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide",
          mode === 'up' && 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
          mode === 'down' && 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300',
          mode === 'mod' && 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
          mode === 'ai' && 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
        )}>
          {mode} Mode
        </div>
      )}
    </div>
  );
};

export default CounterDisplay;
