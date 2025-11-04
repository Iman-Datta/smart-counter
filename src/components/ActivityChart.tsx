import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ActivityChartProps {
  upCount: number;
  downCount: number;
  aiCount: number;
}

const ActivityChart = ({ upCount, downCount, aiCount }: ActivityChartProps) => {
  const total = upCount + downCount + aiCount;
  
  const getPercentage = (count: number) => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  const modes = [
    { name: 'Up', count: upCount, color: 'bg-green-600', lightColor: 'bg-green-200 dark:bg-green-950' },
    { name: 'Down', count: downCount, color: 'bg-red-600', lightColor: 'bg-red-200 dark:bg-red-950' },
    { name: 'AI', count: aiCount, color: 'bg-purple-600', lightColor: 'bg-purple-200 dark:bg-purple-950' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Mode Activity
        </CardTitle>
        <CardDescription>
          Distribution of mode usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {modes.map((mode) => {
          const percentage = getPercentage(mode.count);
          return (
            <div key={mode.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{mode.name} Mode</span>
                <span className="text-muted-foreground">
                  {mode.count} ({percentage}%)
                </span>
              </div>
              <div className={`h-3 rounded-full ${mode.lightColor} overflow-hidden`}>
                <div
                  className={`h-full ${mode.color} transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total Actions</span>
            <span>{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
