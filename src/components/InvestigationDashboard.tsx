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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Walmart Investigation Framework</h1>
              <p className="text-primary-foreground/80 mt-1">
                5-Minute Shorts/Overs Analysis System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                Version 1.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!investigationStarted ? (
          /* Welcome Screen */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Start Investigation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This automated tool streamlines investigations with a structured 4-step process, 
                built-in timer system, and intelligent risk assessment to ensure compliance with 
                the 5-minute target while capturing all critical information.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Timer System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Color-coded visual alerts ensure investigations stay within the 5-minute target
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">4-Step Process</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Structured workflow guides through Basic Info, Patterns, Root Cause, and Resolution
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Smart Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automated risk scoring and pattern recognition for faster decision-making
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Audit Trail</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Complete documentation with JSON export for record keeping and compliance
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Step Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Investigation Process Overview</CardTitle>
                <CardDescription>
                  Follow these time-optimized steps to complete your investigation efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">30s</div>
                    <div className="font-medium mb-1">Basic Information</div>
                    <div className="text-sm text-muted-foreground">
                      Store, department, amount, and incident details
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">1m</div>
                    <div className="font-medium mb-1">Pattern Recognition</div>
                    <div className="text-sm text-muted-foreground">
                      Identify trends and recurring issues
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">2m</div>
                    <div className="font-medium mb-1">Root Cause Analysis</div>
                    <div className="text-sm text-muted-foreground">
                      Determine underlying causes and factors
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">1.5m</div>
                    <div className="font-medium mb-1">Resolution & Action</div>
                    <div className="text-sm text-muted-foreground">
                      Define actions and risk assessment
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timer Component */}
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
            <div className="lg:col-span-2">
              <InvestigationWizard timeElapsed={timeElapsed} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}