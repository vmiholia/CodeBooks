
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CODE_DATA_ELEMENTS, CODE_GROUPS } from "@/types/codeData";

interface RightTocProps {
  onSectionClick: (groupName: string) => void;
  onElementClick: (elementName: string) => void;
  activeSection?: string;
}

export const RightToc = ({ onSectionClick, onElementClick, activeSection }: RightTocProps) => {
  const groups = CODE_GROUPS.sort((a, b) => a.GroupID - b.GroupID);

  // Sample metrics data that would normally come from props or API
  const getMetricForElement = (elementName: string): string | null => {
    const metrics: Record<string, string> = {
      "Global Period": "90",
      "Medicare Allowable Fee (POS)": "$1,247",
      "RVU Breakdown": "37.57",
      "ICD-10-CM Crosswalks": "270",
      "ICD-10-PCS Crosswalk": "85",
      "HCPCS / Supply Crosswalk": "42",
      "CPT Assistant Articles": "15",
      "AHA Coding Clinic": "8",
      "CCI Edits & Modifier Indicator": "2",
      "Documentation Tips": "5",
      "Related Procedure Codes": "12",
      "Code History & Valuation": "2019",
      "Real-Time Claim Scrubber": "84%"
    };
    return metrics[elementName] || null;
  };

  return (
    <div className="p-3 h-full overflow-y-auto">
      <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wide">
        Table of Contents
      </h3>
      <div className="space-y-2">
        {groups.map((group) => {
          const elementsInGroup = CODE_DATA_ELEMENTS.filter(item => item.GroupID === group.GroupID);
          const isActive = activeSection === group.GroupName;
          
          return (
            <div key={group.GroupID} className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto p-2 text-left font-medium text-xs hover:bg-muted ${
                  isActive ? 'bg-muted text-primary' : ''
                }`}
                onClick={() => onSectionClick(group.GroupName)}
              >
                <span className="truncate">{group.GroupName}</span>
              </Button>
              <div className="ml-2 space-y-1">
                {elementsInGroup.map((element) => {
                  const metric = getMetricForElement(element.ElementName);
                  return (
                    <div key={element.ElementID} className="flex items-center gap-1">
                      <button
                        className="text-xs text-muted-foreground hover:text-primary transition-colors text-left flex-1 min-w-0 truncate"
                        onClick={() => onElementClick(element.ElementName)}
                        title={element.ElementName}
                      >
                        {element.ElementName}
                      </button>
                      {metric && (
                        <Badge variant="outline" className="text-xs flex-shrink-0 px-1.5 py-0.5">
                          {metric}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
