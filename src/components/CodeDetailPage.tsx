
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CODE_DATA_ELEMENTS, SAMPLE_CODES } from "@/types/codeData";
import { ElementBlock } from "@/components/ElementBlock";

interface CodeDetailPageProps {
  codeId: string;
  onActiveTabChange?: (tab: string) => void;
  onElementNavigate?: (elementName: string) => void;
}

export const CodeDetailPage = ({ codeId, onActiveTabChange, onElementNavigate }: CodeDetailPageProps) => {
  const [activeTab, setActiveTab] = useState<string>();
  
  // Get unique groups and sort by first appearance
  const groups = useMemo(() => {
    const uniqueGroups = Array.from(new Set(CODE_DATA_ELEMENTS.map(item => item.Group)));
    return uniqueGroups;
  }, []);

  // Set default tab to first group
  const defaultTab = groups[0] || "";
  const currentTab = activeTab || defaultTab;

  // Handle tab change and notify parent
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onActiveTabChange?.(tab);
  };

  // Handle element navigation
  const handleElementNavigate = (elementName: string) => {
    // Find which group this element belongs to
    const element = CODE_DATA_ELEMENTS.find(item => item.Element === elementName);
    if (element && element.Group !== currentTab) {
      // Switch to the correct tab first
      handleTabChange(element.Group);
    }
    
    // Scroll to the element after a brief delay to allow tab change
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
    }, 100);
    
    onElementNavigate?.(elementName);
  };

  // Expose the handler to parent component
  React.useEffect(() => {
    if (onElementNavigate) {
      // This is a hack to expose the handler to the parent
      // In a real app, you'd use a ref or context
      (window as any).navigateToElement = handleElementNavigate;
    }
  }, [onElementNavigate]);

  // Get code details
  const codeDetails = SAMPLE_CODES.find(code => code.id === codeId);

  if (!codeDetails) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground">Code not found</h2>
        </div>
      </div>
    );
  }

  return (
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
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap flex-shrink-0">
            <ExternalLink className="h-4 w-4 mr-2" />
            External Ref
          </Button>
        </div>
      </div>

      {/* Dynamic Tabs */}
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className={`grid w-full grid-cols-${groups.length} mb-8 bg-muted`}>
          {groups.map((group) => (
            <TabsTrigger 
              key={group} 
              value={group}
              className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap px-2 py-2"
            >
              {group}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map((group) => (
          <TabsContent key={group} value={group} className="space-y-6">
            {CODE_DATA_ELEMENTS
              .filter(item => item.Group === group)
              .sort((a, b) => a.Priority - b.Priority)
              .map((element, index) => (
                <ElementBlock
                  key={`${group}-${element.Element}-${index}`}
                  element={element}
                  codeId={codeId}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
