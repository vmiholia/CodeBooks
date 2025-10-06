import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CODE_DATA_ELEMENTS, CODE_GROUPS } from "@/types/codeData";
import { ArrowUp, Maximize2, Minimize2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface RightTocProps {
  onSectionClick: (groupName: string) => void;
  onElementClick: (elementName: string) => void;
  activeSection?: string;
  onExpandAllGroups: () => void;
  onCollapseAllGroups: () => void;
  onGoToTop: () => void;
  allGroupsExpanded: boolean;
  anyGroupExpanded: boolean;
}

export const RightToc = ({ onSectionClick, onElementClick, activeSection, onExpandAllGroups, onCollapseAllGroups, onGoToTop, allGroupsExpanded, anyGroupExpanded }: RightTocProps) => {
  const groups = CODE_GROUPS.sort((a, b) => a.GroupID - b.GroupID);
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const tocHeaderRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stickyGroup, setStickyGroup] = useState<string | null>(null);

  useEffect(() => {
    const container = tocContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (!groupRefs.current.length) return;
      let found = null;
      for (let i = 0; i < groupRefs.current.length; i++) {
        const ref = groupRefs.current[i];
        if (ref && container) {
          const rect = ref.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          if (rect.top - containerRect.top - 56 > 0) { // 56px for sticky controls height
            found = i > 0 ? groups[i - 1].GroupName : null;
            break;
          }
        }
      }
      if (!found && groupRefs.current[groupRefs.current.length - 1] && container) {
        // If scrolled to the bottom, show last group
        const lastRect = groupRefs.current[groupRefs.current.length - 1].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (lastRect.top - containerRect.top - 56 <= 0) {
          found = groups[groups.length - 1].GroupName;
        }
      }
      setStickyGroup(found);
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [groups]);

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
    <div ref={tocContainerRef} className="h-full overflow-y-auto pb-8">
      {/* Sticky Table of Contents Header and Controls */}
      <div ref={tocHeaderRef} className="sticky top-0 left-0 right-0 z-10 bg-white pb-2 pt-1 w-full border-b border-gray-100 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2 w-full pt-4 pl-3">
          <Button
            onClick={onExpandAllGroups}
            variant="outline"
            size="sm"
            className="text-[11px] justify-start pr-4"
            disabled={allGroupsExpanded}
          >
            <Maximize2 className="h-3 w-3 mr-1" />
            <span className="text-left">Expand All</span>
          </Button>
          <Button
            onClick={onCollapseAllGroups}
            variant="outline"
            size="sm"
            className="text-[11px] justify-start pr-4"
            disabled={!anyGroupExpanded}
          >
            <Minimize2 className="h-3 w-3 mr-1" />
            <span className="text-left">Collapse All</span>
          </Button>
        </div>
        <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wide pl-3 w-full text-left">
          Table of Contents
        </h3>
      </div>
      {/* Sticky group header above group list */}
      {stickyGroup && (
        <div className="sticky top-[56px] z-9 bg-white border-b border-gray-100 py-1 w-full left-0 right-0">
          <span className="font-semibold text-sm text-foreground pl-3 block text-left">{stickyGroup}</span>
        </div>
      )}
      {/* Table of Contents List */}
      <div className="space-y-2 p-0">
        {groups.map((group, idx) => {
          const elementsInGroup = CODE_DATA_ELEMENTS.filter(item => item.GroupID === group.GroupID);
          const isActive = activeSection === group.GroupName;
          return (
            <div key={group.GroupID} className="space-y-1" ref={el => groupRefs.current[idx] = el}>
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto p-2 pl-3 text-left font-medium text-xs transition-colors
                  ${isActive ? 'bg-muted text-primary' : 'text-foreground'}
                  hover:bg-muted hover:text-primary
                `}
                style={{ zIndex: 5 }}
                onClick={() => onSectionClick(group.GroupName)}
              >
                <span className="truncate text-left">{group.GroupName}</span>
              </Button>
              <div className="space-y-1">
                {elementsInGroup.map((element) => {
                  const metric = getMetricForElement(element.ElementName);
                  return (
                    <div key={element.ElementID} className="flex items-center gap-1">
                      <button
                        className="text-xs text-muted-foreground hover:text-primary transition-colors text-left flex-1 min-w-0 truncate pl-3"
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
