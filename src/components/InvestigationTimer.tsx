import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InvestigationTimerProps {
  onTimeUpdate: (time: number) => void;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function InvestigationTimer({ onTimeUpdate, isActive, onStart, onStop }: InvestigationTimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => {
          const newTime = time + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerStatus = () => {
    if (time <= 240) return 'active'; // 0-4 minutes: green
    if (time <= 300) return 'warning'; // 4-5 minutes: yellow
    return 'expired'; // 5+ minutes: red
  };

  const getTimerClasses = () => {
    const status = getTimerStatus();
    return cn(
      "inline-block px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300",
      status === 'active' && "bg-green-500 text-white timer-pulse",
      status === 'warning' && "bg-yellow-500 text-white timer-pulse",
      status === 'expired' && "bg-red-500 text-white timer-pulse",
      !isActive && "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="card-glass p-8">
      <div className="text-center">
        <div className={getTimerClasses()}>
          ⏱️ {isActive ? formatTime(time) : 'Timer: Ready'}
        </div>
        
        <div className="mt-6">
          {!isActive ? (
            <Button 
              onClick={onStart}
              className="gradient-primary text-white font-semibold px-8 py-3 text-lg rounded-xl hover:scale-105 transition-transform"
            >
              Start Investigation
            </Button>
          ) : (
            <Button 
              onClick={onStop}
              variant="secondary"
              className="px-8 py-3 text-lg rounded-xl"
            >
              Stop Timer
            </Button>
          )}
        </div>

        {isActive && (
          <div className="mt-6">
            <div className="text-sm text-gray-600 mb-2">Investigation Status</div>
            <div className={cn(
              "text-lg font-semibold",
              time <= 300 ? "text-green-600" : "text-red-600"
            )}>
              {time <= 300 ? "✅ Within 5-minute target" : "⚠️ Exceeded time limit"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}