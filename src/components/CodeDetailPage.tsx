import React, { useState, useMemo, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Stethoscope, Activity, Shield, AlertTriangle, CheckCircle, Clock, DollarSign, BookOpen, ChevronDown, ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CODE_DATA_ELEMENTS, CODE_GROUPS, SAMPLE_CODES } from "@/types/codeData";
import { ElementBlock } from "@/components/ElementBlock";

// Type for window extension
declare global {
  interface Window {
    navigateToElement?: (elementName: string) => void;
  }
}

interface CodeDetailPageProps {
  codeId: string;
  onActiveTabChange?: (tab: string) => void;
  onElementNavigate?: (elementName: string) => void;
  expandedGroups: Set<number>;
  setExpandedGroups: React.Dispatch<React.SetStateAction<Set<number>>>;
  groups: typeof CODE_GROUPS;
}

export const CodeDetailPage = ({ codeId, onActiveTabChange, onElementNavigate, expandedGroups, setExpandedGroups, groups }: CodeDetailPageProps) => {
  // Reference for scrolling to top
  const topRef = useRef<HTMLDivElement>(null);
  
  // Calculate states for controls
  const allGroupsExpanded = expandedGroups.size === groups.length;

  // Toggle group expansion
  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
    
    // Notify parent of the active section
    const group = groups.find(g => g.GroupID === groupId);
    if (group) {
      onActiveTabChange?.(group.GroupName);
    }
  };

  // Group-level controls for overlay
  const expandAllGroups = () => {
    const allGroupIds = new Set(groups.map(g => g.GroupID));
    setExpandedGroups(allGroupIds);
  };

  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
  };

  // Go to top functionality
  const goToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  // Handle element navigation
  const handleElementNavigate = (elementName: string) => {
    // Find which group this element belongs to
    const element = CODE_DATA_ELEMENTS.find(item => item.ElementName === elementName);
    if (element) {
      // Expand the group if it's not already expanded
      if (!expandedGroups.has(element.GroupID)) {
        toggleGroup(element.GroupID);
      }
    }
    
    // Scroll to the element after a brief delay to allow expansion
    setTimeout(() => {
      const scrollId = elementName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const targetElement = document.getElementById(scrollId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 300);
    
    onElementNavigate?.(elementName);
  };

  // Expose the handler to parent component
  React.useEffect(() => {
    if (onElementNavigate) {
      // This is a hack to expose the handler to the parent
      // In a real app, you'd use a ref or context
      window.navigateToElement = handleElementNavigate;
    }
  }, [onElementNavigate]);

  // Get code details
  const codeDetails = SAMPLE_CODES.find(code => code.id === codeId);

  // Add scroll state for floating button
  const [showGoToTop, setShowGoToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!codeDetails) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground">Code not found</h2>
        </div>
      </div>
    );
  }

  // Get element count for each group
  const getGroupElementCount = (groupId: number) => {
    return CODE_DATA_ELEMENTS.filter(item => item.GroupID === groupId).length;
  };

  return (
    <div className="relative">
      {/* Scroll target */}
      <div ref={topRef} className="absolute top-0" />
      {/* Floating Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={goToTop}
          className="fixed left-1/2 bottom-10 z-50 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 hover:bg-primary hover:text-white transition-colors flex items-center justify-center group"
          aria-label="Go to Top"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs rounded px-2 py-1 left-1/2 -translate-x-1/2 -top-8 transition-opacity pointer-events-none">Go to Top</span>
        </button>
      )}
      
      <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
        {/* Code Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold text-foreground">{codeDetails.code}</h1>
                <Badge variant="outline" className="border-primary text-primary whitespace-nowrap">{codeDetails.category}</Badge>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {codeDetails.title}
              </p>
            </div>
            
            {/* Visual Icons Section */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Status Indicators */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full border border-green-200">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Active</span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full border border-blue-200">
                  <Shield className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Covered</span>
                </div>
              </div>

              {/* Category-specific Icon */}
              <div className="flex items-center gap-2">
                {codeDetails.category === "Cardiology" && (
                  <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                    <Heart className="h-4 w-4 text-red-600" />
                  </div>
                )}
                {codeDetails.category === "Radiology" && (
                  <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                    <Activity className="h-4 w-4 text-purple-600" />
                  </div>
                )}
                {(codeDetails.category === "E/M" || codeDetails.category === "Musculoskeletal") && (
                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>

              {/* Quick Info Icons */}
              <div className="flex items-center gap-1">
                <div className="p-1.5 bg-yellow-50 rounded border border-yellow-200" title="Billing Guidelines">
                  <DollarSign className="h-3 w-3 text-yellow-600" />
                </div>
                
                <div className="p-1.5 bg-orange-50 rounded border border-orange-200" title="Updated Recently">
                  <Clock className="h-3 w-3 text-orange-600" />
                </div>
                
                <div className="p-1.5 bg-indigo-50 rounded border border-indigo-200" title="Has Guidelines">
                  <BookOpen className="h-3 w-3 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Groups - Single Column Layout */}
        <div className="space-y-4">
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.GroupID);
            const elementCount = getGroupElementCount(group.GroupID);
            
            return (
              <div key={group.GroupID} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                {/* Group Header - Clickable */}
                <button
                  onClick={() => toggleGroup(group.GroupID)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-t-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-gray-400">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {group.GroupName}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                      {elementCount} items
                    </Badge>
                    {isExpanded && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>

                {/* Group Content - Collapsible */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-6 py-4 space-y-6 bg-gray-50/30">
                    {CODE_DATA_ELEMENTS
                      .filter(item => item.GroupID === group.GroupID)
                      .sort((a, b) => a.Priority - b.Priority)
                      .map((element, index) => (
                        <div key={`${group.GroupID}-${element.ElementID}-${index}`} className="last:mb-0">
                          <ElementBlock
                            element={element}
                            codeId={codeId}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
