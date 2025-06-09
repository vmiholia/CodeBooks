
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
    <div className="p-4 h-full overflow-y-auto">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
        Medical Codes
      </h3>
      <div className="space-y-2">
        {filteredCodes.map((code) => (
          <Button
            key={code.id}
            variant="ghost"
            className={cn(
              "w-full justify-start h-auto p-3 text-left",
              selectedCode === code.id && "bg-muted border border-border"
            )}
            onClick={() => onCodeSelect(code.id)}
          >
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-sm">{code.code}</span>
                <Badge variant="outline" className="text-xs">
                  {code.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground text-left leading-relaxed">
                {code.title}
              </p>
            </div>
          </Button>
        ))}
      </div>
      
      {filteredCodes.length === 0 && searchQuery && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No codes found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};
