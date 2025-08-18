import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvestigationData } from '../InvestigationWizard';

interface BasicInfoStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

const DEPARTMENTS = [
  'Electronics', 'Grocery', 'Pharmacy', 'Automotive', 'Home & Garden',
  'Clothing', 'Toys', 'Sports', 'Beauty', 'Jewelry', 'Photo Center'
];

const ISSUE_TYPES = [
  'Cash Short', 'Cash Over', 'Inventory Discrepancy', 'Transaction Error',
  'System Malfunction', 'Procedure Violation', 'Customer Complaint'
];

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const updateBasicInfo = (field: keyof InvestigationData['basicInfo'], value: string | number) => {
    onUpdate({
      basicInfo: {
        ...data.basicInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the essential details about the incident. Target completion: 30 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="storeNumber">Store Number</Label>
          <Input
            id="storeNumber"
            placeholder="e.g., 1234"
            value={data.basicInfo.storeNumber}
            onChange={(e) => updateBasicInfo('storeNumber', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select 
            value={data.basicInfo.department} 
            onValueChange={(value) => updateBasicInfo('department', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={data.basicInfo.amount || ''}
            onChange={(e) => updateBasicInfo('amount', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Issue Type</Label>
          <Select 
            value={data.basicInfo.type} 
            onValueChange={(value) => updateBasicInfo('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent>
              {ISSUE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerNumber">Register Number</Label>
          <Input
            id="registerNumber"
            placeholder="e.g., REG-01"
            value={data.basicInfo.registerNumber}
            onChange={(e) => updateBasicInfo('registerNumber', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input
            id="employeeId"
            placeholder="e.g., EMP12345"
            value={data.basicInfo.employeeId}
            onChange={(e) => updateBasicInfo('employeeId', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}