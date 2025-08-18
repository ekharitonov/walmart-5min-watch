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

const ROOT_CAUSE_CATEGORIES = [
  'Human Error',
  'System Malfunction',
  'Process Failure',
  'Training Deficiency',
  'Equipment Failure',
  'Policy Violation',
  'External Factor',
  'Fraudulent Activity'
];

export function RootCauseStep({ data, onUpdate }: RootCauseStepProps) {
  const updateRootCause = (field: keyof InvestigationData['rootCause'], value: any) => {
    onUpdate({
      rootCause: {
        ...data.rootCause,
        [field]: value
      }
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Root Cause Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Identify the underlying cause of the incident. Target completion: 2 minutes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Primary Cause Category</Label>
          <Select 
            value={data.rootCause.category} 
            onValueChange={(value) => updateRootCause('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select root cause category" />
            </SelectTrigger>
            <SelectContent>
              {ROOT_CAUSE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="details">Detailed Analysis</Label>
          <Textarea
            id="details"
            placeholder="Describe the specific circumstances that led to this incident..."
            value={data.rootCause.details}
            onChange={(e) => updateRootCause('details', e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label>Contributing Factors</Label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="employeeInvolved"
                checked={data.rootCause.employeeInvolved}
                onCheckedChange={(checked) => updateRootCause('employeeInvolved', checked)}
              />
              <Label htmlFor="employeeInvolved" className="text-sm">
                Employee action or inaction contributed to the issue
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="registerIssue"
                checked={data.rootCause.registerIssue}
                onCheckedChange={(checked) => updateRootCause('registerIssue', checked)}
              />
              <Label htmlFor="registerIssue" className="text-sm">
                Register or system malfunction was a factor
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Quick Analysis Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>• Was proper procedure followed?</div>
            <div>• Were systems functioning correctly?</div>
            <div>• Was adequate training provided?</div>
            <div>• Were there environmental factors?</div>
            <div>• Was supervision adequate?</div>
            <div>• Were policies clearly communicated?</div>
          </div>
        </div>
      </div>
    </div>
  );
}