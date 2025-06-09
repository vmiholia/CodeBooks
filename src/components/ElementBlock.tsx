import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Info, Plus, Minus } from "lucide-react";
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

interface GlobalPeriodData {
  code: string;
  title: string;
  description: string;
  preoperative?: string;
  intraoperative?: string;
  postoperative?: string;
}

interface MockContentModifiers {
  type: "modifiers";
  data: ModifierData[];
}

interface MockContentHistory {
  type: "history";
  data: HistoryData[];
}

interface MockContentGlobalPeriod {
  type: "global-period";
  data: GlobalPeriodData;
}

interface MockContentMedicareFees {
  type: "medicare-fees";
  data: {
    title: string;
    note: string;
    sections: {
      name: string;
      type: "collapsible";
      content?: {
        title: string;
        table: {
          modifier: string;
          medicareAllowed: string;
          percentage150: string;
          percentage200: string;
          myFee: string;
        }[];
        participatingSection?: {
          title: string;
          table: {
            modifier: string;
            allowed: string;
            medicare80: string;
            patientPays: string;
          }[];
        };
        nonParticipatingAccepted?: {
          title: string;
          table: {
            modifier: string;
            allowed: string;
            medicare80: string;
            patientPays: string;
            limitingCharge: string;
          }[];
        };
        nonParticipatingNotAccepted?: {
          title: string;
          table: {
            modifier: string;
            allowed: string;
            medicare80: string;
            patientPays: string;
            limitingCharge: string;
          }[];
        };
      };
    }[];
  };
}

interface MockContentGeneral {
  type: "content";
  data: string;
}

type MockContent = MockContentModifiers | MockContentHistory | MockContentGlobalPeriod | MockContentMedicareFees | MockContentGeneral;

export const ElementBlock = ({ element, codeId }: ElementBlockProps) => {
  const [showAllModifiers, setShowAllModifiers] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const scrollId = element.ElementName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

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

      case "Global Period":
        return {
          type: "global-period",
          data: {
            code: "090",
            title: "Major Surgery",
            description: "Medicare includes major surgery with a 1-day preoperative period and 90-day postoperative period included in the fee schedule payment amount.",
            preoperative: "8%",
            intraoperative: "83%",
            postoperative: "9%"
          }
        };

      case "Medicare Allowable Fee (POS)":
        return {
          type: "medicare-fees",
          data: {
            title: "Calculated for DE (19801) - Novitas Solutions, Inc.",
            note: "* Note: Medicare may or may NOT reimburse you for this code. The fees provided below are based on values established by CMS/Medicare. Please check with your local Medicare contact on whether this code is eligible for reimbursement.",
            sections: [
              {
                name: "Fees",
                type: "collapsible"
              },
              {
                name: "Facility (Hospital, etc.)",
                type: "collapsible",
                content: {
                  title: "Medicare vs. My Fee Evaluation",
                  table: [
                    {
                      modifier: "(none)",
                      medicareAllowed: "$706.46",
                      percentage150: "$1,059.69",
                      percentage200: "$1,412.93",
                      myFee: "(enter)"
                    },
                    {
                      modifier: "(MPPR)",
                      medicareAllowed: "$353.55",
                      percentage150: "$530.32",
                      percentage200: "$707.09",
                      myFee: "(enter)"
                    }
                  ],
                  participatingSection: {
                    title: "Medicare Participating - Assignment Accepted (Mandatory)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$706.46",
                        medicare80: "$##.##",
                        patientPays: "$##.##"
                      },
                      {
                        modifier: "(MPPR)",
                        allowed: "$353.55",
                        medicare80: "$##.##",
                        patientPays: "$##.##"
                      }
                    ]
                  },
                  nonParticipatingAccepted: {
                    title: "Medicare Non-Participating - Assignment Accepted (Check To Doctor)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$##.##",
                        medicare80: "$##.##",
                        patientPays: "$##.##",
                        limitingCharge: "$##.##"
                      },
                      {
                        modifier: "(MPPR)",
                        allowed: "$##.##",
                        medicare80: "$##.##",
                        patientPays: "$##.##",
                        limitingCharge: "$##.##"
                      }
                    ]
                  },
                  nonParticipatingNotAccepted: {
                    title: "Medicare Non-Participating - Assignment NOT Accepted (Check To Patient)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$##.##",
                        medicare80: "$##.##",
                        patientPays: "$##.##",
                        limitingCharge: "$##.##"
                      },
                      {
                        modifier: "(MPPR)",
                        allowed: "$##.##",
                        medicare80: "$##.##",
                        patientPays: "$##.##",
                        limitingCharge: "$##.##"
                      }
                    ]
                  }
                }
              },
              {
                name: "Non-Facility (Office, etc.)",
                type: "collapsible"
              },
              {
                name: "APC Fee Information",
                type: "collapsible"
              },
              {
                name: "Fee Schedules",
                type: "collapsible"
              },
              {
                name: "UCR Fees (UCR, WC, Medicare)",
                type: "collapsible"
              }
            ]
          }
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
                className="ml-4 text-xs h-8 px-3 bg-white hover:bg-gray-50 border-purple-300 text-purple-700 hover:text-purple-800"
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
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Action</TableHead>
                  <TableHead className="font-semibold text-gray-700">Notes</TableHead>
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

    if (content.type === "global-period") {
      return (
        <TooltipProvider>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600 font-medium">global days</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-help">
                      <span className="text-2xl font-bold text-gray-900">{content.data.code}</span>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-md p-3">
                    <div className="space-y-2">
                      <p className="font-semibold">Global Surgery Period Information</p>
                      <div className="text-sm space-y-2">
                        <p><strong>000:</strong> Medicare includes endoscopic or minor procedure with related preoperative and postoperative relative values on the day of the procedure only in the fee schedule payment amount. Medicare doesn't generally pay evaluation and management (E/M) services on the day of the procedure.</p>
                        <p><strong>010:</strong> Medicare includes minor procedure with preoperative relative values on the day of the procedure and postoperative relative values during a 10-day postoperative period in the fee schedule amount. Medicare doesn't generally pay E/M services on the day of the procedure and during this 10-day postoperative period.</p>
                        <p><strong>090:</strong> Medicare includes major surgery with a 1-day preoperative period and 90-day postoperative period included in the fee schedule payment amount.</p>
                        <p><strong>MMM:</strong> Maternity codes; usual global period doesn't apply.</p>
                        <p><strong>XXX:</strong> Global concept doesn't apply.</p>
                        <p><strong>YYY:</strong> A/B MAC decides whether global concept applies and establishes postoperative period at time of pricing.</p>
                        <p><strong>ZZZ:</strong> Code related to another service. Medicare always includes it in the global period of the other service.</p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </TooltipProvider>
      );
    }

    if (content.type === "medicare-fees") {
      return (
        <div className="space-y-4">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">{content.data.title}</h4>
            <p className="text-sm text-gray-600">{content.data.note}</p>
          </div>

          <div className="space-y-2">
            {content.data.sections.map((section, index) => (
              <Collapsible 
                key={index} 
                open={openSections[section.name]} 
                onOpenChange={() => toggleSection(section.name)}
              >
                <CollapsibleTrigger asChild>
                  <div className="bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-green-700 transition-colors">
                    <div className="flex items-center gap-2">
                      {openSections[section.name] ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      <span className="font-medium">{section.name}</span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  {section.name === "Facility (Hospital, etc.)" && section.content && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                      {/* Medicare vs. My Fee Evaluation */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">{section.content.title}</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">medicare allowed</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">150%</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">200%</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">my fee</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.content.table.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.medicareAllowed}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.percentage150}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.percentage200}</td>
                                  <td className="border border-gray-200 px-3 py-2 text-gray-500">{row.myFee}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Access Feature Notice */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">Calculated fee values are available.</p>
                        <p className="text-sm text-gray-700 mb-3">Access to this feature is available in the following products:</p>
                        <ul className="text-sm text-gray-700 mb-3 ml-4">
                          <li>• Find-A-Code Facility Base/Plus/Complete</li>
                        </ul>
                        <Button variant="outline" size="sm" className="text-sm">
                          subscribe
                        </Button>
                      </div>

                      {/* Medicare Participating */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">{section.content.participatingSection.title}</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">allowed</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">medicare 80%</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">patient pays</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.content.participatingSection.table.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.allowed}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.medicare80}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.patientPays}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Medicare Non-Participating - Assignment Accepted */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">
                          {section.content.nonParticipatingAccepted.title}
                        </h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">allowed</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">medicare 80%</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">patient pays</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">limiting charge (amount billed)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.content.nonParticipatingAccepted.table.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.allowed}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.medicare80}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.patientPays}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.limitingCharge}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Medicare Non-Participating - Assignment NOT Accepted */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">
                          {section.content.nonParticipatingNotAccepted.title}
                        </h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">allowed</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">medicare 80%</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">patient pays</th>
                                <th className="border border-gray-200 px-3 py-2 text-left font-medium">limiting charge (amount billed)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.content.nonParticipatingNotAccepted.table.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.allowed}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.medicare80}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.patientPays}</td>
                                  <td className="border border-gray-200 px-3 py-2">{row.limitingCharge}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {section.name !== "Facility (Hospital, etc.)" && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <p className="text-gray-600">Content for {section.name} section would appear here.</p>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
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
