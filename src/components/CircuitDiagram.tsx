import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CircuitDiagramProps {
  mode: 'up' | 'down' | 'ai' | null;
  modN: number;
  currentValue: number;
}

const CircuitDiagram = ({ mode, modN, currentValue }: CircuitDiagramProps) => {
  if (!mode) return null;

  // Calculate number of flip-flops needed (log2 of modN, rounded up)
  const numFlipFlops = Math.ceil(Math.log2(modN));
  
  // Convert current value to binary
  const binaryValue = currentValue.toString(2).padStart(numFlipFlops, '0').split('').reverse();

  const displayMode = mode === 'ai' ? 'up' : mode; // AI mode uses up counter logic

  const renderFlipFlop = (index: number, type: 'T' | 'JK', isActive: boolean) => {
    const activeColor = displayMode === 'up' ? '#16a34a' : '#dc2626';
    const inactiveColor = '#64748b';
    const color = isActive ? activeColor : inactiveColor;

    return (
      <g key={`ff-${index}`} transform={`translate(${index * 140}, 0)`}>
        {/* Flip-flop box */}
        <rect
          x="0"
          y="0"
          width="100"
          height="120"
          fill="none"
          stroke={color}
          strokeWidth="2"
          rx="4"
          className="transition-all duration-300"
        />
        
        {/* Label */}
        <text
          x="50"
          y="25"
          textAnchor="middle"
          fill="currentColor"
          className="text-sm font-mono font-bold"
        >
          {type} FF {index}
        </text>

        {/* Clock input */}
        <line x1="-20" y1="60" x2="0" y2="60" stroke={color} strokeWidth="2" />
        <text x="-25" y="55" textAnchor="end" fill="currentColor" className="text-xs">CLK</text>
        
        {/* Triangle for clock */}
        <polygon points="0,55 8,60 0,65" fill={color} />

        {type === 'JK' && (
          <>
            {/* J input */}
            <line x1="-20" y1="30" x2="0" y2="30" stroke={color} strokeWidth="2" />
            <text x="-25" y="35" textAnchor="end" fill="currentColor" className="text-xs">J</text>
            
            {/* K input */}
            <line x1="-20" y1="90" x2="0" y2="90" stroke={color} strokeWidth="2" />
            <text x="-25" y="95" textAnchor="end" fill="currentColor" className="text-xs">K</text>
          </>
        )}

        {type === 'T' && (
          <>
            {/* T input */}
            <line x1="-20" y1="30" x2="0" y2="30" stroke={color} strokeWidth="2" />
            <text x="-25" y="35" textAnchor="end" fill="currentColor" className="text-xs">T</text>
          </>
        )}

        {/* Q output */}
        <line x1="100" y1="40" x2="120" y2="40" stroke={color} strokeWidth="2" />
        <text x="125" y="45" fill="currentColor" className="text-xs font-bold">Q</text>
        
        {/* Q' output */}
        <line x1="100" y1="80" x2="120" y2="80" stroke={color} strokeWidth="2" />
        <text x="125" y="85" fill="currentColor" className="text-xs">Q'</text>

        {/* Current state indicator */}
        <circle
          cx="50"
          cy="60"
          r="15"
          fill={binaryValue[index] === '1' ? color : 'none'}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-300"
        />
        <text
          x="50"
          y="67"
          textAnchor="middle"
          fill={binaryValue[index] === '1' ? 'white' : 'currentColor'}
          className="text-xl font-bold font-mono"
        >
          {binaryValue[index]}
        </text>
      </g>
    );
  };

  const renderSynchronousCircuit = (type: 'T' | 'JK') => {
    return (
      <svg
        viewBox={`-50 -20 ${numFlipFlops * 140 + 50} 200`}
        className="w-full h-auto"
        style={{ minHeight: '250px' }}
      >
        {/* Common clock line */}
        <line
          x1="-40"
          y1="60"
          x2={numFlipFlops * 140 - 40}
          y2="60"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="-45" y="55" textAnchor="end" fill="currentColor" className="text-xs font-bold">
          CLK
        </text>

        {/* Render flip-flops */}
        {Array.from({ length: numFlipFlops }, (_, i) => 
          renderFlipFlop(i, type, binaryValue[i] === '1')
        )}

        {/* Connection lines between flip-flops */}
        {Array.from({ length: numFlipFlops - 1 }, (_, i) => (
          <line
            key={`conn-${i}`}
            x1={i * 140 + 120}
            y1="40"
            x2={(i + 1) * 140 - 20}
            y2="30"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}
      </svg>
    );
  };

  const renderAsynchronousCircuit = (type: 'T' | 'JK') => {
    return (
      <svg
        viewBox={`-50 -20 ${numFlipFlops * 140 + 50} 200`}
        className="w-full h-auto"
        style={{ minHeight: '250px' }}
      >
        {/* Individual clock connections (ripple) */}
        {Array.from({ length: numFlipFlops }, (_, i) => {
          if (i === 0) {
            return (
              <g key={`clk-${i}`}>
                <line x1="-40" y1="60" x2="-20" y2="60" stroke="currentColor" strokeWidth="1.5" />
                <text x="-45" y="55" textAnchor="end" fill="currentColor" className="text-xs font-bold">
                  CLK
                </text>
              </g>
            );
          }
          return (
            <line
              key={`clk-${i}`}
              x1={(i - 1) * 140 + 120}
              y1="80"
              x2={i * 140 - 20}
              y2="60"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Render flip-flops */}
        {Array.from({ length: numFlipFlops }, (_, i) => 
          renderFlipFlop(i, type, binaryValue[i] === '1')
        )}
      </svg>
    );
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">
        Live Circuit Diagrams - {displayMode === 'up' ? 'Up' : 'Down'} Counter (Mod-{modN})
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Binary State: <span className="font-mono font-bold">{binaryValue.reverse().join('')}</span> (Decimal: {currentValue})
      </p>
      
      <Tabs defaultValue="sync-t" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sync-t">Sync T-FF</TabsTrigger>
          <TabsTrigger value="async-t">Async T-FF</TabsTrigger>
          <TabsTrigger value="sync-jk">Sync JK-FF</TabsTrigger>
          <TabsTrigger value="async-jk">Async JK-FF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sync-t" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Synchronous T Flip-Flop Counter</h4>
              <p className="text-sm text-muted-foreground">
                All flip-flops are triggered by the same clock signal simultaneously.
              </p>
            </div>
            {renderSynchronousCircuit('T')}
          </div>
        </TabsContent>
        
        <TabsContent value="async-t" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Asynchronous T Flip-Flop Counter (Ripple)</h4>
              <p className="text-sm text-muted-foreground">
                Each flip-flop is triggered by the output of the previous one, creating a ripple effect.
              </p>
            </div>
            {renderAsynchronousCircuit('T')}
          </div>
        </TabsContent>
        
        <TabsContent value="sync-jk" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Synchronous JK Flip-Flop Counter</h4>
              <p className="text-sm text-muted-foreground">
                All flip-flops are triggered by the same clock signal simultaneously.
              </p>
            </div>
            {renderSynchronousCircuit('JK')}
          </div>
        </TabsContent>
        
        <TabsContent value="async-jk" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Asynchronous JK Flip-Flop Counter (Ripple)</h4>
              <p className="text-sm text-muted-foreground">
                Each flip-flop is triggered by the output of the previous one, creating a ripple effect.
              </p>
            </div>
            {renderAsynchronousCircuit('JK')}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CircuitDiagram;
