
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_CODES } from "@/types/codeData";
import { cn } from "@/lib/utils";

interface LeftNavProps {
  selectedCode: string | null;
  onCodeSelect: (codeId: string) => void;
  searchQuery: string;
}

export const LeftNav = ({ selectedCode, onCodeSelect, searchQuery }: LeftNavProps) => {
  const filteredCodes = SAMPLE_CODES.filter(code =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 h-full overflow-y-auto bg-sidebar text-sidebar-foreground">
      <h3 className="font-semibold text-sm text-sidebar-foreground/70 mb-4 uppercase tracking-wide">
        Medical Codes
      </h3>
      <div className="space-y-2">
        {filteredCodes.map((code) => (
          <Button
            key={code.id}
            variant="ghost"
            className={cn(
              "w-full justify-start h-auto p-3 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              selectedCode === code.id && "bg-sidebar-primary text-sidebar-primary-foreground"
            )}
            onClick={() => onCodeSelect(code.id)}
          >
            <div className="space-y-2 w-full min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-semibold text-sm truncate">{code.code}</span>
                <Badge variant="outline" className="text-xs border-sidebar-foreground/20 text-sidebar-foreground/70 whitespace-nowrap flex-shrink-0">
                  {code.category}
                </Badge>
              </div>
              <p className="text-xs text-sidebar-foreground/60 text-left leading-relaxed line-clamp-2 break-words">
                {code.title}
              </p>
            </div>
          </Button>
        ))}
      </div>
      
      {filteredCodes.length === 0 && searchQuery && (
        <div className="text-center py-8 text-sidebar-foreground/60 text-sm">
          No codes found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};
