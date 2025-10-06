import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowUp, 
  Menu,
  X,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationOverlayProps {
  // Group-level controls
  totalGroups: number;
  expandedGroups: Set<number>;
  onExpandAllGroups: () => void;
  onCollapseAllGroups: () => void;
  
  // Section-level controls
  expandedSections: { [key: string]: boolean };
  onExpandAllSections: () => void;
  onCollapseAllSections: () => void;
  
  // Navigation
  onGoToTop: () => void;
  
  className?: string;
}

export const NavigationOverlay = ({
  totalGroups,
  expandedGroups,
  onExpandAllGroups,
  onCollapseAllGroups,
  expandedSections,
  onExpandAllSections,
  onCollapseAllSections,
  onGoToTop,
  className
}: NavigationOverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Track scroll position for showing/hiding scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate states
  const allGroupsExpanded = expandedGroups.size === totalGroups;
  const expandedSectionCount = Object.values(expandedSections).filter(Boolean).length;
  const totalSectionCount = Object.keys(expandedSections).length;
  const allSectionsExpanded = expandedSectionCount === totalSectionCount && totalSectionCount > 0;

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsVisible(true)}
                size="lg"
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Show Navigation Controls</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-64",
      className
    )}>
      <TooltipProvider>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Quick Controls</h3>
            <p className="text-xs text-gray-500">Expand, collapse, and navigate</p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Simple Controls */}
        <div className="p-4 space-y-3">
          {/* Group Controls */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700 block">Groups ({expandedGroups.size}/{totalGroups})</span>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onExpandAllGroups}
                variant="outline"
                size="sm"
                className="justify-center text-xs"
                disabled={allGroupsExpanded}
              >
                <Maximize2 className="h-3 w-3 mr-1" />
                Expand All
              </Button>
              
              <Button
                onClick={onCollapseAllGroups}
                variant="outline"
                size="sm"
                className="justify-center text-xs"
                disabled={expandedGroups.size === 0}
              >
                <Minimize2 className="h-3 w-3 mr-1" />
                Collapse All
              </Button>
            </div>
          </div>

          {/* Section Controls */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-700 block">
              Sections ({expandedSectionCount}/{totalSectionCount})
            </span>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onExpandAllSections}
                variant="outline"
                size="sm"
                className="justify-center text-xs"
                disabled={allSectionsExpanded || totalSectionCount === 0}
              >
                <Eye className="h-3 w-3 mr-1" />
                Expand All
              </Button>
              
              <Button
                onClick={onCollapseAllSections}
                variant="outline"
                size="sm"
                className="justify-center text-xs"
                disabled={expandedSectionCount === 0}
              >
                <EyeOff className="h-3 w-3 mr-1" />
                Collapse All
              </Button>
            </div>
            
            {totalSectionCount === 0 && (
              <p className="text-xs text-gray-500 italic text-center">
                Expand groups to see sections
              </p>
            )}
          </div>

          {/* Go to Top */}
          <div className="pt-2 border-t border-gray-100">
            <Button
              onClick={onGoToTop}
              variant="outline"
              size="sm"
              className="w-full justify-center text-xs"
            >
              <ArrowUp className="h-3 w-3 mr-1" />
              Go to Top
            </Button>
          </div>
        </div>
      </TooltipProvider>

      {/* Floating Scroll to Top Button */}
      {showScrollToTop && (
        <div className="absolute -top-16 right-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onGoToTop}
                size="lg"
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Scroll to Top</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}; 