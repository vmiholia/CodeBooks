
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CODE_DATA_ELEMENTS } from "@/types/codeData";

interface RightTocProps {
  onSectionClick: (groupName: string) => void;
  onElementClick: (elementName: string) => void;
  activeSection?: string;
}

export const RightToc = ({ onSectionClick, onElementClick, activeSection }: RightTocProps) => {
  const groups = Array.from(new Set(CODE_DATA_ELEMENTS.map(item => item.Group)));

  // Sample metrics data that would normally come from props or API
  const getMetricForElement = (elementName: string): string | null => {
    const metrics: Record<string, string> = {
      "Global Period": "90",
      "Medicare Allowable Fee (POS)": "$1,247",
      "RVU Breakdown": "37.57",
      "ICD-10-CM Crosswalks": "270",
      "CCI Edits & Modifier Indicator": "2",
      "Documentation Requirements": "5",
      "Related Procedures": "12",
      "Code History": "2019",
      "Usage Statistics": "84%"
    };
    return metrics[elementName] || null;
  };

  return (
    <div className="p-4 h-full">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
        Table of Contents
      </h3>
      <div className="space-y-3">
        {groups.map((group) => {
          const elementsInGroup = CODE_DATA_ELEMENTS.filter(item => item.Group === group);
          const isActive = activeSection === group;
          
          return (
            <div key={group} className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto p-2 text-left font-medium text-sm hover:bg-muted ${
                  isActive ? 'bg-muted text-primary' : ''
                }`}
                onClick={() => onSectionClick(group)}
              >
                {group}
              </Button>
              <div className="ml-4 space-y-1">
                {elementsInGroup.slice(0, 3).map((element) => {
                  const metric = getMetricForElement(element.Element);
                  return (
                    <div key={element.Element} className="flex items-center justify-between">
                      <button
                        className="text-xs text-muted-foreground truncate hover:text-primary transition-colors text-left flex-1"
                        onClick={() => onElementClick(element.Element)}
                      >
                        {element.Element}
                      </button>
                      <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                        {metric && (
                          <Badge variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {element.Priority}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {elementsInGroup.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{elementsInGroup.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
