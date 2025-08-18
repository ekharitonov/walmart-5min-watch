import { useState, useEffect } from 'react';
import { Clock, PlayCircle, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InvestigationTimerProps {
  onTimeUpdate: (timeInSeconds: number) => void;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function InvestigationTimer({ onTimeUpdate, isActive, onStart, onStop }: InvestigationTimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(time => {
          const newTime = time + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeElapsed <= 240) return 'timer-green';
    if (timeElapsed <= 300) return 'timer-yellow';
    return 'timer-red';
  };

  const getTimerBgClass = () => {
    if (timeElapsed <= 240) return 'bg-gradient-timer-green';
    if (timeElapsed <= 300) return 'bg-gradient-timer-yellow';
    return 'bg-gradient-timer-red';
  };

  const getProgressPercentage = () => {
    return Math.min((timeElapsed / 300) * 100, 100);
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-medium">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Investigation Timer</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {!isActive ? (
            <Button onClick={onStart} variant="default" size="sm">
              <PlayCircle className="h-4 w-4 mr-1" />
              Start
            </Button>
          ) : (
            <Button onClick={onStop} variant="destructive" size="sm">
              <StopCircle className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className={cn(
          "text-center p-6 rounded-lg transition-all duration-300 shadow-timer",
          getTimerBgClass()
        )}>
          <div className="text-4xl font-bold text-white mb-2">
            {formatTime(timeElapsed)}
          </div>
          <div className="text-white/80 text-sm">
            Target: 5:00 minutes
          </div>
        </div>

        <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-300",
              getTimerBgClass()
            )}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className={cn(
            "text-center p-2 rounded",
            timeElapsed <= 240 ? "bg-timer-green/10 text-timer-green font-medium" : "text-muted-foreground"
          )}>
            0-4:00 min
          </div>
          <div className={cn(
            "text-center p-2 rounded",
            timeElapsed > 240 && timeElapsed <= 300 ? "bg-timer-yellow/10 text-timer-yellow font-medium" : "text-muted-foreground"
          )}>
            4:00-5:00 min
          </div>
          <div className={cn(
            "text-center p-2 rounded",
            timeElapsed > 300 ? "bg-timer-red/10 text-timer-red font-medium" : "text-muted-foreground"
          )}>
            5:00+ min
          </div>
        </div>
      </div>
    </div>
  );
}