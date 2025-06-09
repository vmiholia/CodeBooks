
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CODE_DATA_ELEMENTS, SAMPLE_CODES, type CodeDataElement } from "@/types/codeData";
import { ElementBlock } from "@/components/ElementBlock";

interface CodeDetailPageProps {
  codeId: string;
}

export const CodeDetailPage = ({ codeId }: CodeDetailPageProps) => {
  const [activeTab, setActiveTab] = useState<string>();
  
  // Get unique groups and sort by first appearance
  const groups = useMemo(() => {
    const uniqueGroups = Array.from(new Set(CODE_DATA_ELEMENTS.map(item => item.Group)));
    return uniqueGroups;
  }, []);

  // Set default tab to first group
  const defaultTab = groups[0] || "";
  const currentTab = activeTab || defaultTab;

  // Get elements for current tab, sorted by priority
  const currentElements = useMemo(() => {
    return CODE_DATA_ELEMENTS
      .filter(item => item.Group === currentTab)
      .sort((a, b) => a.Priority - b.Priority);
  }, [currentTab]);

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
    <div className="p-6 max-w-5xl mx-auto">
      {/* Code Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{codeDetails.code}</h1>
              <Badge variant="secondary">{codeDetails.category}</Badge>
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-lg text-muted-foreground max-w-4xl">
              {codeDetails.title}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            External Ref
          </Button>
        </div>
      </div>

      {/* Dynamic Tabs */}
      <Tabs value={currentTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {groups.map((group) => (
            <TabsTrigger 
              key={group} 
              value={group}
              className="text-sm font-medium"
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
