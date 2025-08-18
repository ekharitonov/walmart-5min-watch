import { useState } from 'react';
import { InvestigationTimer } from './InvestigationTimer';
import { InvestigationWizard } from './InvestigationWizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp, Shield } from 'lucide-react';

export function InvestigationDashboard() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [investigationStarted, setInvestigationStarted] = useState(false);

  const handleTimerStart = () => {
    setIsTimerActive(true);
    setInvestigationStarted(true);
  };

  const handleTimerStop = () => {
    setIsTimerActive(false);
  };

  const handleTimeUpdate = (time: number) => {
    setTimeElapsed(time);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="card-glass mb-8">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">🎯 Shorts/Overs Quick Analysis Framework</h1>
              <p className="text-gray-600 mt-2 text-lg">
                5-Minute Investigation Protocol
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
                Version 1.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8">
        {!investigationStarted ? (
          /* Welcome Screen */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ready to Start Investigation</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This automated tool streamlines investigations with a structured 4-step process, 
                built-in timer system, and intelligent risk assessment to ensure compliance with 
                the 5-minute target while capturing all critical information.
              </p>
            </div>

            <InvestigationTimer 
              onTimeUpdate={handleTimeUpdate}
              isActive={isTimerActive}
              onStart={handleTimerStart}
              onStop={handleTimerStop}
            />
          </div>
        ) : (
          /* Investigation Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <InvestigationTimer 
                onTimeUpdate={handleTimeUpdate}
                isActive={isTimerActive}
                onStart={handleTimerStart}
                onStop={handleTimerStop}
              />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <InvestigationWizard timeElapsed={timeElapsed} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}