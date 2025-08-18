import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InvestigationData } from '../InvestigationWizard';
import { cn } from '@/lib/utils';

interface PatternRecognitionStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

const COMMON_PATTERNS = [
  {
    id: 'recurring-employee',
    title: 'Recurring Employee Issues',
    description: 'Same employee involved in multiple incidents'
  },
  {
    id: 'time-pattern',
    title: 'Time Pattern',
    description: 'Issues occurring at specific times (shift changes, breaks)'
  },
  {
    id: 'register-specific',
    title: 'Register-Specific',
    description: 'Problems isolated to particular registers'
  },
  {
    id: 'amount-pattern',
    title: 'Amount Patterns',
    description: 'Consistent dollar amounts or percentage discrepancies'
  },
  {
    id: 'department-trend',
    title: 'Department Trends',
    description: 'Higher frequency in specific departments'
  },
  {
    id: 'transaction-type',
    title: 'Transaction Type Issues',
    description: 'Problems with specific transaction types (returns, voids)'
  },
  {
    id: 'system-related',
    title: 'System-Related',
    description: 'Technology or software-related patterns'
  },
  {
    id: 'training-gap',
    title: 'Training Gaps',
    description: 'Issues indicating insufficient training'
  }
];

export function PatternRecognitionStep({ data, onUpdate }: PatternRecognitionStepProps) {
  const togglePattern = (patternId: string) => {
    const currentPatterns = data.patterns || [];
    const isSelected = currentPatterns.includes(patternId);
    
    const updatedPatterns = isSelected 
      ? currentPatterns.filter(id => id !== patternId)
      : [...currentPatterns, patternId];
      
    onUpdate({ patterns: updatedPatterns });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pattern Recognition</h3>
        <p className="text-sm text-muted-foreground">
          Identify any patterns that may be related to this incident. Target completion: 1 minute.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Common Patterns to Check</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Selected:</span>
            <Badge variant="secondary">{(data.patterns || []).length}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMON_PATTERNS.map((pattern) => {
            const isSelected = (data.patterns || []).includes(pattern.id);
            return (
              <Button
                key={pattern.id}
                onClick={() => togglePattern(pattern.id)}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "h-auto p-4 text-left justify-start",
                  isSelected && "bg-primary text-primary-foreground"
                )}
              >
                <div>
                  <div className="font-medium text-sm mb-1">
                    {pattern.title}
                  </div>
                  <div className={cn(
                    "text-xs opacity-80",
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {pattern.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {(data.patterns || []).length > 0 && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <h5 className="font-medium mb-2">Selected Patterns</h5>
            <div className="flex flex-wrap gap-2">
              {data.patterns?.map((patternId) => {
                const pattern = COMMON_PATTERNS.find(p => p.id === patternId);
                return pattern ? (
                  <Badge key={patternId} variant="secondary">
                    {pattern.title}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}