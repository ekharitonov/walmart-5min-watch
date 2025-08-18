import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvestigationData } from '../InvestigationWizard';

interface BasicInfoStepProps {
  data: InvestigationData;
  onUpdate: (data: Partial<InvestigationData>) => void;
  timeElapsed: number;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const updateBasicInfo = (field: string, value: string | number) => {
    onUpdate({
      basicInfo: {
        ...data.basicInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="card-glass p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📋 Step 1: Basic Information</h2>
        <p className="text-gray-600">Target: 30 seconds - Quick data entry for essential details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="storeNumber" className="text-sm font-medium text-gray-700">Store Number</Label>
            <Input
              id="storeNumber"
              placeholder="e.g., 5260"
              value={data.basicInfo.storeNumber}
              onChange={(e) => updateBasicInfo('storeNumber', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3"
            />
          </div>

          <div>
            <Label htmlFor="department" className="text-sm font-medium text-gray-700">Department</Label>
            <Select onValueChange={(value) => updateBasicInfo('department', value)}>
              <SelectTrigger className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="automotive">Automotive</SelectItem>
                <SelectItem value="garden">Garden Center</SelectItem>
                <SelectItem value="sporting">Sporting Goods</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">Discrepancy Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 250.00"
              value={data.basicInfo.amount || ''}
              onChange={(e) => updateBasicInfo('amount', parseFloat(e.target.value) || 0)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type</Label>
            <Select onValueChange={(value) => updateBasicInfo('type', value)}>
              <SelectTrigger className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (Missing)</SelectItem>
                <SelectItem value="over">Over (Excess)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="register" className="text-sm font-medium text-gray-700">Register/Terminal</Label>
            <Input
              id="register"
              placeholder="e.g., SCO-4, REG-12"
              value={data.basicInfo.registerNumber}
              onChange={(e) => updateBasicInfo('registerNumber', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3"
            />
          </div>

          <div>
            <Label htmlFor="employee" className="text-sm font-medium text-gray-700">Employee ID (if known)</Label>
            <Input
              id="employee"
              placeholder="Employee ID or Name"
              value={data.basicInfo.employeeId}
              onChange={(e) => updateBasicInfo('employeeId', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}