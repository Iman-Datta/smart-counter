import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Brain, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ModeControlsProps {
  onModeChange: (mode: 'up' | 'down' | 'ai') => void;
  onReset: () => void;
  onModNChange: (n: number) => void;
  currentMode: 'up' | 'down' | 'ai' | null;
  modNValue: number;
}

const ModeControls = ({ onModeChange, onReset, onModNChange, currentMode, modNValue }: ModeControlsProps) => {
  const [modN, setModN] = useState(modNValue.toString());

  const handleModNChange = (value: string) => {
    setModN(value);
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      onModNChange(num);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          onClick={() => onModeChange('up')}
          variant={currentMode === 'up' ? 'default' : 'outline'}
          className={currentMode === 'up' 
            ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
            : 'hover:bg-green-50 hover:border-green-600 dark:hover:bg-green-950/20'}
          size="lg"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          Up Mode
        </Button>

        <Button
          onClick={() => onModeChange('down')}
          variant={currentMode === 'down' ? 'default' : 'outline'}
          className={currentMode === 'down' 
            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600' 
            : 'hover:bg-red-50 hover:border-red-600 dark:hover:bg-red-950/20'}
          size="lg"
        >
          <TrendingDown className="w-5 h-5 mr-2" />
          Down Mode
        </Button>

        <Button
          onClick={() => onModeChange('ai')}
          variant={currentMode === 'ai' ? 'default' : 'outline'}
          className={currentMode === 'ai' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600 animate-pulse-glow' 
            : 'hover:bg-purple-50 hover:border-purple-600 dark:hover:bg-purple-950/20'}
          size="lg"
        >
          <Brain className="w-5 h-5 mr-2" />
          AI Mode
        </Button>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="modN" className="text-sm font-medium mb-2 block">
            Mod-N Value (N)
          </Label>
          <Input
            id="modN"
            type="number"
            min="1"
            value={modN}
            onChange={(e) => handleModNChange(e.target.value)}
            placeholder="Enter N value"
            className="text-lg"
          />
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ModeControls;
