import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_CODES, CODE_GROUPS } from "@/types/codeData";
import { cn } from "@/lib/utils";
import { FileText, Search, BookOpen, Calculator, Stethoscope, Activity } from "lucide-react";

interface LeftNavProps {
  selectedCode: string | null;
  onCodeSelect: (codeId: string) => void;
  searchQuery: string;
}

export const LeftNav = ({ selectedCode, onCodeSelect, searchQuery }: LeftNavProps) => {
  // Show search results only when user is actively searching
  const isSearching = searchQuery.trim().length > 0;
  
  const filteredCodes = SAMPLE_CODES.filter(code =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigation categories for when not searching
  const navigationCategories = [
    {
      name: "Recently Viewed",
      icon: Activity,
      items: [
        { id: "93005", code: "93005", title: "Electrocardiogram, routine ECG", category: "Cardiology" },
        { id: "29888", code: "29888", title: "Arthroscopic ACL repair", category: "Musculoskeletal" }
      ]
    },
    {
      name: "Favorites",
      icon: BookOpen,
      items: [
        { id: "99213", code: "99213", title: "Office visit E/M", category: "E/M" }
      ]
    },
    {
      name: "Browse by Category",
      icon: FileText,
      items: [
        { id: "cardiology", code: "CARD", title: "Cardiology Procedures", category: "Category", isCategory: true },
        { id: "musculoskeletal", code: "MSK", title: "Musculoskeletal", category: "Category", isCategory: true },
        { id: "radiology", code: "RAD", title: "Radiology & Imaging", category: "Category", isCategory: true },
        { id: "em", code: "E/M", title: "Evaluation & Management", category: "Category", isCategory: true },
        { id: "gastro", code: "GI", title: "Gastroenterology", category: "Category", isCategory: true }
      ]
    }
  ];

  if (isSearching) {
    return (
      <div className="p-4 h-full overflow-y-auto bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-sidebar-foreground/70" />
          <h3 className="font-semibold text-sm text-sidebar-foreground/70 uppercase tracking-wide">
            Search Results
          </h3>
        </div>
        
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
        
        {filteredCodes.length === 0 && (
          <div className="text-center py-8 text-sidebar-foreground/60 text-sm">
            No codes found matching "{searchQuery}"
          </div>
        )}
      </div>
    );
  }

  // Default navigation when not searching
  return (
    <div className="p-4 h-full overflow-y-auto bg-sidebar text-sidebar-foreground">
      <h3 className="font-semibold text-sm text-sidebar-foreground/70 mb-4 uppercase tracking-wide">
        Navigation
      </h3>
      
      <div className="space-y-6">
        {navigationCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <IconComponent className="h-4 w-4 text-sidebar-foreground/70" />
                <h4 className="font-medium text-xs text-sidebar-foreground/70 uppercase tracking-wide">
                  {category.name}
                </h4>
              </div>
              
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-auto p-3 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      selectedCode === item.id && "bg-sidebar-primary text-sidebar-primary-foreground",
                      item.isCategory && "opacity-75 hover:opacity-100"
                    )}
                    onClick={() => !item.isCategory && onCodeSelect(item.id)}
                  >
                    <div className="space-y-2 w-full min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          "font-semibold text-sm truncate",
                          item.isCategory ? "font-normal" : "font-mono"
                        )}>
                          {item.code}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs border-sidebar-foreground/20 text-sidebar-foreground/70 whitespace-nowrap flex-shrink-0",
                            item.isCategory && "bg-sidebar-foreground/10"
                          )}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-sidebar-foreground/60 text-left leading-relaxed line-clamp-2 break-words">
                        {item.title}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
