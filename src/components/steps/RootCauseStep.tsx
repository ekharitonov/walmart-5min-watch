import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { InvestigationData } from '../InvestigationWizard';

interface RootCauseStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

export function RootCauseStep({ data, onUpdate }: RootCauseStepProps) {
  const rootCausesLeft = [
    { id: 'cashier', label: 'Cashier error' },
    { id: 'sku', label: 'Wrong SKU scanned' },
    { id: 'quantity', label: 'Quantity key error' }
  ];

  const rootCausesRight = [
    { id: 'override', label: 'Price override' },
    { id: 'return', label: 'Return processing' },
    { id: 'selfCheckout', label: 'Self-checkout issue' }
  ];

  const updateRootCause = (field: string, value: any) => {
    onUpdate({
      rootCause: {
        ...data.rootCause,
        [field]: value
      }
    });
  };

  const handleCauseChange = (causeId: string, checked: boolean) => {
    // For this demo, we'll store the selected causes in the details field
    const currentDetails = data.rootCause.details || '';
    const causeLabel = [...rootCausesLeft, ...rootCausesRight].find(c => c.id === causeId)?.label || '';
    
    if (checked) {
      const newDetails = currentDetails ? `${currentDetails}, ${causeLabel}` : causeLabel;
      updateRootCause('details', newDetails);
    } else {
      const newDetails = currentDetails.replace(new RegExp(`, ?${causeLabel}|${causeLabel}, ?`, 'g'), '');
      updateRootCause('details', newDetails);
    }
  };

  return (
    <div className="card-glass p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">⚡ Step 3: Quick Root Cause Analysis</h2>
        <p className="text-gray-600">Target: 2 minutes - Determine underlying causes and factors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label className="text-lg font-medium text-gray-700 mb-4 block">
            Most Likely Causes:
          </Label>
          <div className="space-y-3">
            {rootCausesLeft.map((cause) => (
              <div key={cause.id} className="checkbox-item">
                <Checkbox
                  id={cause.id}
                  onCheckedChange={(checked) => handleCauseChange(cause.id, checked as boolean)}
                  className="mr-3"
                />
                <Label htmlFor={cause.id} className="cursor-pointer text-sm">
                  {cause.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-3">
            {rootCausesRight.map((cause) => (
              <div key={cause.id} className="checkbox-item">
                <Checkbox
                  id={cause.id}
                  onCheckedChange={(checked) => handleCauseChange(cause.id, checked as boolean)}
                  className="mr-3"
                />
                <Label htmlFor={cause.id} className="cursor-pointer text-sm">
                  {cause.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="employee" className="text-sm font-medium text-gray-700">Employee Involved (if known)</Label>
            <input
              id="employee"
              type="text"
              placeholder="Employee ID or Name"
              className="w-full mt-1 p-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              onChange={(e) => updateRootCause('employeeInvolved', e.target.value !== '')}
            />
          </div>

          <div>
            <Label htmlFor="register" className="text-sm font-medium text-gray-700">Register/Terminal</Label>
            <input
              id="register"
              type="text"
              placeholder="e.g., SCO-4, REG-12"
              className="w-full mt-1 p-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              onChange={(e) => updateRootCause('registerIssue', e.target.value !== '')}
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">Primary Cause Category</Label>
            <Select onValueChange={(value) => updateRootCause('category', value)}>
              <SelectTrigger className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3">
                <SelectValue placeholder="Select root cause category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Human Error">Human Error</SelectItem>
                <SelectItem value="System Malfunction">System Malfunction</SelectItem>
                <SelectItem value="Process Failure">Process Failure</SelectItem>
                <SelectItem value="Training Deficiency">Training Deficiency</SelectItem>
                <SelectItem value="Equipment Failure">Equipment Failure</SelectItem>
                <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                <SelectItem value="External Factor">External Factor</SelectItem>
                <SelectItem value="Fraudulent Activity">Fraudulent Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}