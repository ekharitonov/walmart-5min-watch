import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { InvestigationData } from '../InvestigationWizard';
import { cn } from '@/lib/utils';

interface PatternRecognitionStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

export function PatternRecognitionStep({ data, onUpdate }: PatternRecognitionStepProps) {
  const [selectedQuickIssue, setSelectedQuickIssue] = useState<string>('');

  const commonPatterns = [
    { id: 'endOfShift', label: 'End of shift' },
    { id: 'weekend', label: 'Weekend/Holiday' },
    { id: 'highTraffic', label: 'High traffic period' },
    { id: 'newEmployee', label: 'New employee' },
    { id: 'systemUpdate', label: 'System update/downtime' },
    { id: 'vendorDelivery', label: 'Vendor delivery day' },
    { id: 'promotion', label: 'Promotion/Sale active' },
    { id: 'inventoryCount', label: 'Inventory count day' }
  ];

  const quickIssues = [
    { id: 'scanning', label: 'Scanning Issue' },
    { id: 'training', label: 'Training Gap' },
    { id: 'system', label: 'System Error' },
    { id: 'theft', label: 'Possible Theft' }
  ];

  const handlePatternChange = (patternId: string, checked: boolean) => {
    const currentPatterns = data.patterns || [];
    const newPatterns = checked 
      ? [...currentPatterns, patternId]
      : currentPatterns.filter(p => p !== patternId);
    
    onUpdate({ patterns: newPatterns });
  };

  const handleQuickIssueSelect = (issueId: string) => {
    setSelectedQuickIssue(selectedQuickIssue === issueId ? '' : issueId);
  };

  return (
    <div className="card-glass p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔍 Step 2: Pattern Recognition</h2>
        <p className="text-gray-600">Target: 1 minute - Identify common patterns and quick issues</p>
      </div>

      <div className="space-y-8">
        {/* Common Patterns */}
        <div>
          <Label className="text-lg font-medium text-gray-700 mb-4 block">
            Common Patterns (Check all that apply):
          </Label>
          <div className="checkbox-grid">
            {commonPatterns.map((pattern) => (
              <div key={pattern.id} className="checkbox-item">
                <Checkbox
                  id={pattern.id}
                  checked={data.patterns?.includes(pattern.id) || false}
                  onCheckedChange={(checked) => handlePatternChange(pattern.id, checked as boolean)}
                  className="mr-3"
                />
                <Label htmlFor={pattern.id} className="cursor-pointer text-sm">
                  {pattern.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <Label className="text-lg font-medium text-gray-700 mb-4 block">
            Quick Issue Identification:
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickIssues.map((issue) => (
              <div
                key={issue.id}
                className={cn(
                  'quick-action-btn',
                  selectedQuickIssue === issue.id && 'selected'
                )}
                onClick={() => handleQuickIssueSelect(issue.id)}
              >
                {issue.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}