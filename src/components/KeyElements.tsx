
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface KeyElementsProps {
  codeId: string;
}

export const KeyElements = ({ codeId }: KeyElementsProps) => {
  // Sample data based on the Findacode.com reference
  const keyElements = [
    { label: "RVUs Non-Facility", value: "21.840", color: "bg-blue-500" },
    { label: "Fees Non-Facility", value: "$706.46", color: "bg-green-600" },
    { label: "Global Days", value: "090", color: "bg-purple-500" },
    { label: "Medicare Policies", value: "0", color: "bg-blue-400" },
    { label: "Articles & Newsletters", value: "~84", color: "bg-purple-600" },
    { label: "ICD-10 Crosswalks", value: "~270", color: "bg-red-500" },
    { label: "ICD-9 Crosswalks", value: "0", color: "bg-indigo-500" },
    { label: "Coding Tips", value: "~1", color: "bg-pink-500" },
    { label: "CCS Classification", value: "113", color: "bg-purple-400" }
  ];

  return (
    <Card className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-green-700 font-medium">
          📍 Facility (Hospital, etc.)
        </span>
        <span className="text-xs text-green-600">auto-open</span>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {keyElements.map((element, index) => (
          <div key={index} className="text-center">
            <div className={`${element.color} text-white text-xs font-bold px-2 py-1 rounded-t`}>
              {element.value}
            </div>
            <div className="bg-white text-xs px-1 py-1 rounded-b border border-t-0 border-gray-200 text-gray-700 font-medium leading-tight">
              {element.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-green-600 mt-2">
        CMS/Medicare. Please check with your local Medicare contact on whether this code is eligible for reimbursement.
      </div>
    </Card>
  );
};
