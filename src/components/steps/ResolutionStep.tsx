import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InvestigationData } from '../InvestigationWizard';
import { cn } from '@/lib/utils';

interface ResolutionStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

const IMMEDIATE_ACTIONS = [
  'No Action Required',
  'Retraining Required',
  'Policy Review',
  'System Repair/Maintenance',
  'Disciplinary Action',
  'Process Modification',
  'Additional Supervision',
  'Investigation Escalation'
];

export function ResolutionStep({ data, onUpdate }: ResolutionStepProps) {
  const updateResolution = (field: keyof InvestigationData['resolution'], value: any) => {
    onUpdate({
      resolution: {
        ...data.resolution,
        [field]: value
      }
    });
  };

  const calculateRiskScore = (): number => {
    let score = 0;
    
    // Amount-based risk
    if (data.basicInfo.amount > 1000) score += 3;
    else if (data.basicInfo.amount > 500) score += 2;
    else if (data.basicInfo.amount > 100) score += 1;
    
    // Pattern-based risk
    if (data.patterns.includes('recurring-employee')) score += 2;
    if (data.patterns.includes('amount-pattern')) score += 2;
    if (data.patterns.length > 2) score += 1;
    
    // Root cause risk
    if (data.rootCause.category === 'Fraudulent Activity') score += 3;
    if (data.rootCause.employeeInvolved) score += 1;
    
    return Math.min(score, 10);
  };

  const getAutoRiskLevel = (): 'low' | 'medium' | 'high' => {
    const score = calculateRiskScore();
    if (score >= 6) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  };

  const riskScore = calculateRiskScore();
  const autoRiskLevel = getAutoRiskLevel();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Resolution & Action Plan</h3>
        <p className="text-sm text-muted-foreground">
          Define immediate actions and follow-up requirements. Target completion: 1.5 minutes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="immediateAction">Immediate Action Required</Label>
          <Select 
            value={data.resolution.immediateAction} 
            onValueChange={(value) => updateResolution('immediateAction', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select immediate action" />
            </SelectTrigger>
            <SelectContent>
              {IMMEDIATE_ACTIONS.map((action) => (
                <SelectItem key={action} value={action}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">Risk Assessment</Label>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Risk Score:</span>
                  <Badge variant="outline">{riskScore}/10</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Auto Risk Level:</span>
                  <Badge 
                    variant={autoRiskLevel === 'high' ? 'destructive' : 
                           autoRiskLevel === 'medium' ? 'default' : 'secondary'}
                  >
                    {autoRiskLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskLevel">Final Risk Level</Label>
              <Select 
                value={data.resolution.riskLevel} 
                onValueChange={(value: 'low' | 'medium' | 'high') => updateResolution('riskLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="followUpRequired"
                checked={data.resolution.followUpRequired}
                onCheckedChange={(checked) => updateResolution('followUpRequired', checked)}
              />
              <Label htmlFor="followUpRequired" className="text-sm">
                Follow-up action required
              </Label>
            </div>

            {data.resolution.followUpRequired && (
              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={data.resolution.followUpDate || ''}
                  onChange={(e) => updateResolution('followUpDate', e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes & Recommendations</Label>
          <Textarea
            id="notes"
            placeholder="Any additional observations, recommendations, or actions for prevention..."
            value={data.resolution.notes}
            onChange={(e) => updateResolution('notes', e.target.value)}
            rows={4}
          />
        </div>

        <div className="bg-accent/10 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Smart Recommendations</h4>
          <div className="space-y-2 text-sm">
            {autoRiskLevel === 'high' && (
              <div className="text-destructive">
                • High-risk incident - Consider management escalation
                • Schedule follow-up within 24-48 hours
              </div>
            )}
            {data.patterns.includes('recurring-employee') && (
              <div className="text-amber-600">
                • Employee pattern detected - Review training records
                • Consider additional supervision or coaching
              </div>
            )}
            {data.rootCause.category === 'System Malfunction' && (
              <div className="text-blue-600">
                • System issue identified - Alert IT/Maintenance
                • Check for similar issues at other registers
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}