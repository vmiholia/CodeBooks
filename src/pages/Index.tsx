
import { useState } from "react";
import { Search, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeDetailPage } from "@/components/CodeDetailPage";
import { LeftNav } from "@/components/LeftNav";
import { RightToc } from "@/components/RightToc";

const Index = () => {
  const [selectedCode, setSelectedCode] = useState<string | null>("29888");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* TopBar */}
      <div className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/24c896e2-4d88-41da-9e7e-0a9c72831117.png" 
              alt="RapidClaims CodeBooks" 
              className="h-8"
            />
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical codes, procedures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex">
        {/* Left Navigation - 240px with dark sidebar styling */}
        <div className="w-60 bg-sidebar border-r border-sidebar-border">
          <LeftNav 
            selectedCode={selectedCode} 
            onCodeSelect={setSelectedCode}
            searchQuery={searchQuery}
          />
        </div>

        {/* Main Content - 1fr */}
        <div className="flex-1 bg-gray-50">
          {selectedCode ? (
            <CodeDetailPage codeId={selectedCode} />
          ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
              Select a code to view details
            </div>
          )}
        </div>

        {/* Right Table of Contents - 260px */}
        <div className="w-65 border-l bg-white">
          <RightToc />
        </div>
      </div>
    </div>
  );
};

export default Index;
