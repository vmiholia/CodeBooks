
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CODE_DATA_ELEMENTS } from "@/types/codeData";

export const RightToc = () => {
  const groups = Array.from(new Set(CODE_DATA_ELEMENTS.map(item => item.Group)));

  const scrollToSection = (groupName: string) => {
    // In a real implementation, this would scroll to the tab section
    console.log(`Scroll to ${groupName}`);
  };

  return (
    <div className="p-4 h-full">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
        Table of Contents
      </h3>
      <div className="space-y-3">
        {groups.map((group) => {
          const elementsInGroup = CODE_DATA_ELEMENTS.filter(item => item.Group === group);
          return (
            <div key={group} className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-2 text-left font-medium text-sm"
                onClick={() => scrollToSection(group)}
              >
                {group}
              </Button>
              <div className="ml-4 space-y-1">
                {elementsInGroup.slice(0, 3).map((element) => (
                  <div key={element.Element} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground truncate">
                      {element.Element}
                    </span>
                    <Badge variant="outline" className="text-xs ml-2">
                      {element.Priority}
                    </Badge>
                  </div>
                ))}
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
