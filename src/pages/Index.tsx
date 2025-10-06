import { useState, useRef } from "react";
import { Search, HelpCircle, User, Clock, Star, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CodeDetailPage } from "@/components/CodeDetailPage";
import { RightToc } from "@/components/RightToc";
import { SAMPLE_CODES, CODE_GROUPS } from "@/types/codeData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedCode, setSelectedCode] = useState<string | null>("93005");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set([1]));
  const topRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (groupName: string) => {
    setActiveSection(groupName);
    const tabElement = document.querySelector(`[value="${groupName}"]`) as HTMLElement;
    if (tabElement) {
      tabElement.click();
    }
  };

  const handleElementClick = (elementName: string) => {
    // Use the global handler exposed by CodeDetailPage
    if ((window as any).navigateToElement) {
      (window as any).navigateToElement(elementName);
    }
  };

  const handleCodeSelect = (codeId: string) => {
    setSelectedCode(codeId);
    // Clear search query when a code is selected
    setSearchQuery("");
    setSelectedFilter("All");
  };

  // Check if user is searching
  const isSearching = searchQuery.trim().length > 0;
  
  // Search filter categories
  const searchFilters = [
    { id: "All", label: "All", count: 0 },
    { id: "CPT", label: "CPT Codes", count: 0 },
    { id: "ICD-10-CM", label: "ICD-10-CM", count: 0 },
    { id: "HCPCS", label: "HCPCS", count: 0 },
    { id: "Procedures", label: "Procedures", count: 0 },
    { id: "Articles", label: "Articles", count: 0 },
  ];

  // Filter codes based on search query
  const filteredCodes = SAMPLE_CODES.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "All") return matchesSearch;
    if (selectedFilter === "CPT") return matchesSearch && code.code.match(/^\d{5}$/);
    if (selectedFilter === "ICD-10-CM") return matchesSearch && code.category.includes("ICD");
    if (selectedFilter === "HCPCS") return matchesSearch && code.category.includes("HCPCS");
    if (selectedFilter === "Procedures") return matchesSearch && (code.category.includes("Surgery") || code.category.includes("Procedure"));
    if (selectedFilter === "Articles") return matchesSearch && code.category.includes("Article");
    
    return matchesSearch;
  });

  // Update filter counts
  const updatedFilters = searchFilters.map(filter => ({
    ...filter,
    count: filter.id === "All" 
      ? SAMPLE_CODES.filter(code => 
          code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          code.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).length
      : filter.id === "CPT"
      ? SAMPLE_CODES.filter(code => 
          (code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
          code.code.match(/^\d{5}$/)
        ).length
      : filter.id === "ICD-10-CM"
      ? SAMPLE_CODES.filter(code => 
          (code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
          code.category.includes("ICD")
        ).length
      : filter.id === "HCPCS"
      ? SAMPLE_CODES.filter(code => 
          (code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
          code.category.includes("HCPCS")
        ).length
      : filter.id === "Procedures"
      ? SAMPLE_CODES.filter(code => 
          (code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (code.category.includes("Surgery") || code.category.includes("Procedure"))
        ).length
      : 0
  }));

  // Recently viewed codes for homepage
  const recentCodes = [
    { id: "93005", code: "93005", title: "Electrocardiogram, routine ECG", category: "Cardiology" },
    { id: "29888", code: "29888", title: "Arthroscopic ACL repair", category: "Musculoskeletal" },
    { id: "99213", code: "99213", title: "Office visit E/M", category: "E/M" }
  ];

  const groups = CODE_GROUPS.sort((a, b) => a.GroupID - b.GroupID);
  const allGroupsExpanded = expandedGroups.size === groups.length;
  const anyGroupExpanded = expandedGroups.size > 0;

  const expandAllGroups = () => {
    const allGroupIds = new Set(groups.map(g => g.GroupID));
    setExpandedGroups(allGroupIds);
  };

  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
  };

  const goToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderSearchResults = () => (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
        <p className="text-gray-600">
          {filteredCodes.length} results for "{searchQuery}"
        </p>
      </div>

      {/* Filter Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {updatedFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={cn(
                "h-8 px-3 text-sm font-medium rounded-full transition-all",
                selectedFilter === filter.id
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className={cn(
                  "ml-1.5 px-1.5 py-0.5 text-xs rounded-full",
                  selectedFilter === filter.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                )}>
                  {filter.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4">
        {filteredCodes.map((code) => (
          <Button
            key={code.id}
            variant="ghost"
            className="w-full h-auto p-6 text-left hover:bg-gray-50 border border-gray-200 rounded-lg transition-all hover:shadow-md hover:border-gray-300"
            onClick={() => handleCodeSelect(code.id)}
          >
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-gray-900">{code.code}</span>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs font-medium",
                    code.category === "Cardiology" && "bg-red-50 text-red-700 border-red-200",
                    code.category === "Musculoskeletal" && "bg-blue-50 text-blue-700 border-blue-200",
                    code.category === "E/M" && "bg-purple-50 text-purple-700 border-purple-200",
                    code.category === "Surgery" && "bg-orange-50 text-orange-700 border-orange-200",
                    code.category === "Radiology" && "bg-green-50 text-green-700 border-green-200",
                    !["Cardiology", "Musculoskeletal", "E/M", "Surgery", "Radiology"].includes(code.category) && "bg-gray-50 text-gray-700 border-gray-200"
                  )}
                >
                  {code.category}
                </Badge>
              </div>
              <p className="text-gray-700 text-left leading-relaxed">
                {code.title}
              </p>
              
              {/* Additional metadata */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Active
                </span>
                <span>Updated recently</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      {/* No Results State */}
      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">
            No {selectedFilter.toLowerCase()} found for "{searchQuery}"
          </p>
          <Button
            variant="outline"
            onClick={() => setSelectedFilter("All")}
            className="text-sm"
          >
            Try searching in all categories
          </Button>
        </div>
      )}

      {/* Search Suggestions */}
      {isSearching && filteredCodes.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Search Tips</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Try searching by code number (e.g., "93005") or procedure name</p>
            <p>• Use filters above to narrow down results by code type</p>
            <p>• Search includes descriptions, categories, and related terms</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderHomepage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Code Explorer</h1>
        <p className="text-gray-600">
          Search for CPT codes, procedures, and medical billing information
        </p>
      </div>

      {/* Recently Viewed Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
        </div>
        <div className="grid gap-3">
          {recentCodes.map((code) => (
            <Button
              key={code.id}
              variant="ghost"
              className="w-full h-auto p-4 text-left hover:bg-gray-50 border border-gray-200 rounded-lg"
              onClick={() => handleCodeSelect(code.id)}
            >
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-gray-900">{code.code}</span>
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    {code.category}
                  </Badge>
                </div>
                <p className="text-gray-700 text-left text-sm">
                  {code.title}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-900">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Cardiology", count: 245, color: "bg-red-50 border-red-200 text-red-700" },
            { name: "Musculoskeletal", count: 189, color: "bg-blue-50 border-blue-200 text-blue-700" },
            { name: "Radiology", count: 156, color: "bg-green-50 border-green-200 text-green-700" },
            { name: "E/M Codes", count: 98, color: "bg-purple-50 border-purple-200 text-purple-700" },
            { name: "Surgery", count: 324, color: "bg-orange-50 border-orange-200 text-orange-700" },
            { name: "Gastroenterology", count: 87, color: "bg-teal-50 border-teal-200 text-teal-700" }
          ].map((category) => (
            <div
              key={category.name}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow",
                category.color
              )}
            >
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count} codes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* TopBar */}
      <div className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/24c896e2-4d88-41da-9e7e-0a9c72831117.png" 
              alt="CodeBooks" 
              className="h-8 cursor-pointer"
              onClick={() => {
                setSelectedCode(null);
                setSearchQuery("");
                setSelectedFilter("All");
              }}
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

      {/* Main Layout - No Left Nav */}
      <div className="flex">
        {/* Main Content - Full Width */}
        <div className="flex-1 bg-gray-50 min-w-0">
          <div ref={topRef} />
          {isSearching ? (
            renderSearchResults()
          ) : selectedCode ? (
            <CodeDetailPage 
              codeId={selectedCode} 
              onActiveTabChange={setActiveSection}
              onElementNavigate={handleElementClick}
              expandedGroups={expandedGroups}
              setExpandedGroups={setExpandedGroups}
              groups={groups}
            />
          ) : (
            renderHomepage()
          )}
        </div>

        {/* Right Table of Contents - Only when viewing a code */}
        {selectedCode && !isSearching && (
          <div className="w-64 border-l bg-white flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <RightToc 
              onSectionClick={handleSectionClick}
              onElementClick={handleElementClick}
              activeSection={activeSection}
              onExpandAllGroups={expandAllGroups}
              onCollapseAllGroups={collapseAllGroups}
              onGoToTop={goToTop}
              allGroupsExpanded={allGroupsExpanded}
              anyGroupExpanded={anyGroupExpanded}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
