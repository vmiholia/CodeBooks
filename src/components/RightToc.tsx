
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
    <div className="p-3 h-full overflow-y-auto">
      <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wide">
        Table of Contents
      </h3>
      <div className="space-y-2">
        {groups.map((group) => {
          const elementsInGroup = CODE_DATA_ELEMENTS.filter(item => item.Group === group);
          const isActive = activeSection === group;
          
          return (
            <div key={group} className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto p-2 text-left font-medium text-xs hover:bg-muted ${
                  isActive ? 'bg-muted text-primary' : ''
                }`}
                onClick={() => onSectionClick(group)}
              >
                <span className="truncate">{group}</span>
              </Button>
              <div className="ml-2 space-y-1">
                {elementsInGroup.slice(0, 3).map((element) => {
                  const metric = getMetricForElement(element.Element);
                  return (
                    <div key={element.Element} className="flex items-center gap-1">
                      <button
                        className="text-xs text-muted-foreground hover:text-primary transition-colors text-left flex-1 min-w-0 truncate"
                        onClick={() => onElementClick(element.Element)}
                        title={element.Element}
                      >
                        {element.Element}
                      </button>
                      {metric && (
                        <Badge variant="outline" className="text-xs flex-shrink-0 px-1.5 py-0.5">
                          {metric}
                        </Badge>
                      )}
                    </div>
                  );
                })}
                {elementsInGroup.length > 3 && (
                  <div className="text-xs text-muted-foreground ml-0">
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
