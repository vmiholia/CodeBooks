import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CodeDataElement } from "@/types/codeData";

interface ElementBlockProps {
  element: CodeDataElement;
  codeId: string;
}

interface ModifierData {
  percentage: string;
  modifier: string;
  title: string;
  description: string;
}

interface HistoryData {
  date: string;
  action: string;
  notes: string;
}

interface MockContentModifiers {
  type: "modifiers";
  data: ModifierData[];
}

interface MockContentHistory {
  type: "history";
  data: HistoryData[];
}

interface MockContentGeneral {
  type: "content";
  data: string;
}

type MockContent = MockContentModifiers | MockContentHistory | MockContentGeneral;

export const ElementBlock = ({ element, codeId }: ElementBlockProps) => {
  const [showAllModifiers, setShowAllModifiers] = useState(false);
  const scrollId = element.ElementName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  // Mock data for different element types
  const getMockContent = (elementName: string): MockContent => {
    switch (elementName) {
      case "CCI Edits & Modifier Indicator":
        return {
          type: "modifiers",
          data: [
            {
              percentage: "56.34%",
              modifier: "59",
              title: "Distinct procedural service",
              description: "Under certain circumstances, it may be necessary to indicate that a procedure or service was distinct or independent from other non-e/m services performed on the same day. Modifier 59 is used to identify procedures/services, other than e/m services, that are not normally reported together, but are appropriate under the circumstances. Documentation must support a different session, different procedure or surgery, different site or organ system, separate incision/excision, separate lesion, or separate injury (or area of injury in extensive injuries) not ordinarily encountered or performed on the same day by the same individual. However, when another already established modifier is appropriate it should be used rather than modifier 59. Only if no more descriptive modifier is available, and the use of modifier 59 best explains the circumstances, should modifier 59 be used. Note: modifier 59 should not be appended to an e/m service. To report a separate and distinct e/m service with a non-e/m service performed on the same date, see modifier 25."
            },
            {
              percentage: "21.43%",
              modifier: "51",
              title: "Multiple procedures",
              description: "When multiple procedures, other than e/m services, physical medicine and rehabilitation services or provision of supplies (eg, vaccines), are performed at the same session by the same individual, the primary procedure or service may be reported as listed. The additional procedure(s) or service(s) may be identified by appending modifier 51 to the additional procedure or service code(s). Note: this modifier should not be appended to designated \"add-on\" codes (see appendix d)."
            },
            {
              percentage: "7.16%",
              modifier: "XU",
              title: "Unusual non-overlapping service",
              description: "The use of a service that is distinct because it does not overlap usual components of the main service"
            },
            {
              percentage: "5.50%",
              modifier: "GW",
              title: "Service not related to the hospice patient's terminal condition",
              description: ""
            },
            {
              percentage: "2.33%",
              modifier: "GA",
              title: "Waiver of liability statement issued as required by payer policy, individual case",
              description: ""
            },
            {
              percentage: "1.85%",
              modifier: "GC",
              title: "This service has been performed in part by a resident under the direction of a teaching physician",
              description: ""
            },
            {
              percentage: "1.37%",
              modifier: "GZ",
              title: "Item or service expected to be denied as not reasonable and necessary",
              description: ""
            },
            {
              percentage: "0.95%",
              modifier: "CR",
              title: "Catastrophe/disaster related",
              description: ""
            },
            {
              percentage: "0.72%",
              modifier: "AQ",
              title: "Physician providing a service in an unlisted health professional shortage area (hpsa)",
              description: ""
            },
            {
              percentage: "0.61%",
              modifier: "76",
              title: "Repeat procedure or service by same physician or other qualified health care professional",
              description: "It may be necessary to indicate that a procedure or service was repeated by the same physician or other qualified health care professional subsequent to the original procedure or service. This circumstance may be reported by adding modifier 76 to the repeated procedure or service. Note: this modifier should not be appended to an e/m service."
            },
            {
              percentage: "0.44%",
              modifier: "XE",
              title: "Separate encounter",
              description: "A service that is distinct because it occurred during a separate encounter"
            },
            {
              percentage: "0.35%",
              modifier: "XS",
              title: "Separate structure",
              description: "A service that is distinct because it was performed on a separate organ/structure"
            },
            {
              percentage: "0.28%",
              modifier: "Q1",
              title: "Routine clinical service provided in a clinical research study that is in an approved clinical research study",
              description: ""
            },
            {
              percentage: "0.23%",
              modifier: "PD",
              title: "Diagnostic or related non diagnostic item or service provided in a wholly owned or operated entity to a patient who is admitted as an inpatient within 3 days",
              description: ""
            },
            {
              percentage: "0.21%",
              modifier: "GY",
              title: "Item or service statutorily excluded, does not meet the definition of any medicare benefit or, for non-medicare insurers, is not a contract benefit",
              description: ""
            }
          ]
        };

      case "Code History & Valuation":
        return {
          type: "history",
          data: [
            {
              date: "2011-01-01",
              action: "Changed",
              notes: "Short description changed."
            },
            {
              date: "Pre-1990",
              action: "Added",
              notes: "Code added."
            }
          ]
        };

      case "Official CPT Descriptor":
        return {
          type: "content",
          data: "This is the official CPT descriptor."
        };
      case "Lay Description":
        return {
          type: "content",
          data: "This is a patient-friendly explanation of the procedure."
        };
      case "Clinical Vignette":
        return {
          type: "content",
          data: "This is an example clinical scenario demonstrating appropriate use."
        };
      case "Related Procedure Codes":
        return {
          type: "content",
          data: "These are similar or commonly bundled procedures."
        };
      case "Global Period":
        return {
          type: "content",
          data: "This is the number of days included in the global surgical package."
        };
      case "Inpatient-Only (IPO) Flag":
        return {
          type: "content",
          data: "This indicates if the procedure must be performed in an inpatient setting."
        };
      case "LCD & NCD Coverage Info":
        return {
          type: "content",
          data: "This is local and national coverage determination information."
        };
      case "Documentation Tips":
        return {
          type: "content",
          data: "These are best practices for documentation requirements."
        };
      case "MUE (Medically Unlikely Edit)":
        return {
          type: "content",
          data: "This is the maximum units that can be billed per date of service."
        };
      case "Medicare Allowable Fee (POS)":
        return {
          type: "content",
          data: "These are Medicare fee schedule amounts by place of service."
        };
      case "RVU Breakdown":
        return {
          type: "content",
          data: "This is the work, practice expense, and malpractice RVU components."
        };
      case "ASC Payment Indicator":
        return {
          type: "content",
          data: "This is the Ambulatory Surgery Center payment classification."
        };
      case "UCR / WC Benchmark Fees":
        return {
          type: "content",
          data: "These are Usual, Customary, and Reasonable / Workers' Compensation fee benchmarks."
        };
      case "Custom Fee Modeling":
        return {
          type: "content",
          data: "These are customizable fee schedule modeling tools."
        };
      case "ASA Base Units & Fee Calc":
        return {
          type: "content",
          data: "This is the Anesthesia base units and fee calculation methodology."
        };
      case "ICD-10-CM Crosswalks":
        return {
          type: "content",
          data: "These are mappings to ICD-10-CM diagnosis codes."
        };
      case "ICD-10-PCS Crosswalk":
        return {
          type: "content",
          data: "These are mappings to ICD-10-PCS procedure codes."
        };
      case "HCPCS / Supply Crosswalk":
        return {
          type: "content",
          data: "These are related HCPCS codes and supply items."
        };
      case "CPT Assistant Articles":
        return {
          type: "content",
          data: "These are relevant CPT Assistant clarifications and guidance."
        };
      case "AHA Coding Clinic":
        return {
          type: "content",
          data: "These are American Hospital Association Coding Clinic references."
        };
      case "Visual Icons / Alerts":
        return {
          type: "content",
          data: "These are visual indicators for important code characteristics."
        };
      case "Real-Time Claim Scrubber":
        return {
          type: "content",
          data: "These are real-time validation and claim scrubbing results."
        };
      default:
        return {
          type: "content",
          data: `This is sample content for ${elementName}. In a real application, this would be populated with actual data from your API or database.`
        };
    }
  };

  const content = getMockContent(element.ElementName);

  const renderContent = () => {
    if (content.type === "modifiers") {
      const modifiersToShow = showAllModifiers ? content.data : content.data.slice(0, 3);
      
      return (
        <div className="space-y-6">
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                <span className="text-sm">📊</span>
                Top Modifiers - Most Often Billed
              </h4>
              <Badge variant="outline" className="text-xs">auto-open</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-purple-700">
                Top modifiers billed to Medicare are shown.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllModifiers(!showAllModifiers)}
                className="ml-4 text-xs h-8 px-3"
              >
                {showAllModifiers ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    View All ({content.data.length})
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {modifiersToShow.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-start gap-3 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 font-mono text-sm px-2 py-1">
                    {item.percentage}
                  </Badge>
                  <Badge variant="default" className="bg-purple-600 text-white font-bold text-sm px-3 py-1">
                    {item.modifier}
                  </Badge>
                  <span className="font-semibold text-gray-900">{item.title}</span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-700 leading-relaxed ml-16">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (content.type === "history") {
      return (
        <div className="space-y-4">
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                <span className="text-sm">📜</span>
                Code History
              </h4>
              <Badge variant="outline" className="text-xs">auto-open</Badge>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">date</TableHead>
                  <TableHead className="font-semibold text-gray-700">action</TableHead>
                  <TableHead className="font-semibold text-gray-700">notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>{item.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }

    return (
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700">{content.data}</p>
      </div>
    );
  };

  return (
    <div id={scrollId} className="scroll-mt-20">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{element.ElementName}</h3>
          {element.Definition && (
            <p className="text-sm text-gray-600 mt-1">{element.Definition}</p>
          )}
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
