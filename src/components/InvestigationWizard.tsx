import { useState } from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { PatternRecognitionStep } from './steps/PatternRecognitionStep';
import { RootCauseStep } from './steps/RootCauseStep';
import { ResolutionStep } from './steps/ResolutionStep';

export interface InvestigationData {
  basicInfo: {
    storeNumber: string;
    department: string;
    amount: number;
    type: string;
    registerNumber: string;
    employeeId: string;
  };
  patterns: string[];
  rootCause: {
    category: string;
    details: string;
    employeeInvolved: boolean;
    registerIssue: boolean;
  };
  resolution: {
    immediateAction: string;
    riskLevel: 'low' | 'medium' | 'high';
    followUpRequired: boolean;
    followUpDate?: string;
    notes: string;
  };
}

interface InvestigationWizardProps {
  timeElapsed: number;
}

const STEP_TIME_TARGETS = [30, 90, 210, 300]; // Cumulative targets in seconds

export function InvestigationWizard({ timeElapsed }: InvestigationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<InvestigationData>({
    basicInfo: {
      storeNumber: '',
      department: '',
      amount: 0,
      type: '',
      registerNumber: '',
      employeeId: ''
    },
    patterns: [],
    rootCause: {
      category: '',
      details: '',
      employeeInvolved: false,
      registerIssue: false
    },
    resolution: {
      immediateAction: '',
      riskLevel: 'low',
      followUpRequired: false,
      notes: ''
    }
  });

  const steps = [
    { 
      title: 'Basic Information', 
      target: '30s',
      component: BasicInfoStep 
    },
    { 
      title: 'Pattern Recognition', 
      target: '1m',
      component: PatternRecognitionStep 
    },
    { 
      title: 'Root Cause Analysis', 
      target: '2m',
      component: RootCauseStep 
    },
    { 
      title: 'Resolution & Action', 
      target: '1.5m',
      component: ResolutionStep 
    }
  ];

  const updateData = (stepData: Partial<InvestigationData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepTimeStatus = (stepIndex: number) => {
    const target = STEP_TIME_TARGETS[stepIndex];
    if (timeElapsed <= target) return 'on-time';
    if (timeElapsed <= target + 60) return 'warning';
    return 'overdue';
  };

  const exportData = () => {
    const exportObject = {
      ...data,
      timestamp: new Date().toISOString(),
      totalTime: timeElapsed,
      stepTimes: STEP_TIME_TARGETS.map((target, index) => ({
        step: steps[index].title,
        target,
        status: getStepTimeStatus(index)
      }))
    };

    const dataStr = JSON.stringify(exportObject, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `investigation_${data.basicInfo.storeNumber}_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="bg-card border rounded-lg p-6 shadow-medium">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Investigation Progress</h2>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-colors",
                getStepStatus(index) === 'completed' && "bg-primary border-primary text-primary-foreground",
                getStepStatus(index) === 'active' && "bg-accent border-accent text-accent-foreground",
                getStepStatus(index) === 'pending' && "border-muted-foreground text-muted-foreground"
              )}>
                {getStepStatus(index) === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : getStepStatus(index) === 'active' ? (
                  <Clock className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </div>
              <div className="text-center">
                <div className={cn(
                  "text-sm font-medium",
                  getStepStatus(index) === 'active' && "text-accent-foreground"
                )}>
                  {step.title}
                </div>
                <div className={cn(
                  "text-xs mt-1",
                  getStepTimeStatus(index) === 'on-time' && "text-timer-green",
                  getStepTimeStatus(index) === 'warning' && "text-timer-yellow",
                  getStepTimeStatus(index) === 'overdue' && "text-timer-red"
                )}>
                  Target: {step.target}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 w-full mt-5 absolute left-1/2 transform translate-x-1/2",
                  getStepStatus(index) === 'completed' ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-card border rounded-lg shadow-medium">
        <CurrentStepComponent 
          data={data}
          onUpdate={updateData}
          timeElapsed={timeElapsed}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentStep === steps.length - 1 && (
            <Button onClick={exportData} variant="secondary">
              Export JSON
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} variant="default">
              Next Step
            </Button>
          ) : (
            <Button onClick={exportData} variant="default">
              Complete Investigation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}