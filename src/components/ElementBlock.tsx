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

interface MockContentRichContent {
  type: "rich-content";
  data: {
    title: string;
    content?: string;
    copyright?: string;
    sections?: Array<{
      title: string;
      content?: string;
      note?: string;
      codes?: Array<{
        code: string;
        description: string;
      }>;
      references?: Array<{
        code: string;
        context: string;
      }>;
    }>;
  };
}

interface MockContentCrosswalkTable {
  type: "crosswalk-table";
  data: {
    title: string;
    subtitle: string;
    categories: Array<{
      category: string;
      codes: Array<{
        code: string;
        description: string;
        status: string;
      }>;
    }>;
  };
}

interface MockContentArticlesList {
  type: "articles-list";
  data: {
    title: string;
    description: string;
    accessNote: string;
    articles: Array<{
      year: string;
      title: string;
      month: string;
    }>;
  };
}

interface MockContentCCINcci {
  type: "cci-ncci";
  data: {
    title: string;
    mue: {
      title: string;
      unitsOfService: string;
      adjudicationIndicator: string;
      description: string;
      rationale: string;
      note: string;
    };
    ptpEdits: {
      title: string;
      description: string;
      column1Code: string;
      column1Description: string;
      column2Codes: Array<{
        code: string;
        modifier: string;
      }>;
    };
  };
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

interface MockContentRVUBreakdown {
  type: "rvu-breakdown";
  data: {
    title: string;
    note: string;
    sections: {
      name: string;
      total: string;
      type: "collapsible";
      content?: {
        rvuComponents?: {
          title: string;
          table: {
            modifier: string;
            work: string;
            practiceExpense: string;
            malpracticeExpense: string;
            total: string;
          }[];
          note?: string;
        };
        practitionerWork?: {
          title: string;
          laborSection: {
            title: string;
            table: {
              preService: string;
              intraService: string;
              postService: string;
              totalTime: string;
            };
            note: string;
          };
          workRVUComponents: {
            title: string;
            table: {
              modifier: string;
              nationalUnadjustedWorkRVU: string;
              workGPCI: string;
              adjustedWorkRVU: string;
            }[];
          };
        };
        practiceExpense?: {
          title: string;
          clinicalLabor: {
            title: string;
            table: {
              staff: string;
              staffRate: string;
              preTime: string;
              intraTime: string;
              postTime: string;
              totalTime: string;
            }[];
          };
          equipment: {
            title: string;
            table: {
              item: string;
              purchasePrice: string;
              expectedLife: string;
              totalTime: string;
            }[];
          };
          supplies: {
            title: string;
            table: {
              item: string;
              unitPrice: string;
              quantity: string;
              unit: string;
              amount: string;
            }[];
          };
          indirectNote: string;
          peRVUComponents: {
            title: string;
            table: {
              modifier: string;
              nationalUnadjustedPERVU: string;
              peGPCI: string;
              adjustedPERVU: string;
            }[];
          };
        };
      };
    }[];
  };
}

interface MockContentGeneral {
  type: "content";
  data: string;
}

type MockContent = MockContentModifiers | MockContentHistory | MockContentGlobalPeriod | MockContentMedicareFees | MockContentRVUBreakdown | MockContentGeneral | MockContentRichContent | MockContentCrosswalkTable | MockContentArticlesList | MockContentCCINcci;

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

  // Mock data for different element types - UPDATED WITH REAL CPT 93005 DATA
  const getMockContent = (elementName: string): MockContent => {
    switch (elementName) {
      case "Official CPT Descriptor":
        return {
          type: "content",
          data: "93005 - Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report"
        };

      case "Lay Description":
        return {
          type: "rich-content",
          data: {
            title: "Common Language Description",
            content: `An electrocardiogram (ECG) is used to evaluate the electrical activity of the heart. The test is performed with the patient lying prone on the exam table. Small plastic patches are attached at specific locations on the chest, abdomen, arms, and/or legs. Leads (wires) from the ECG tracing device are then attached to the patches. A tracing is obtained of the electrical signals from the heart. 

Electrical activity begins in the sinoatrial node, which generates an electrical stimulus at regular intervals, usually 60 to 100 times per minute. This stimulus travels through the conduction pathways to the sinoatrial node causing the atria to contract. The stimulus then travels along the bundle of His, which divides into right and left pathways providing electrical stimulation of the ventricles causing them to contract. Each contraction of the ventricles represents one heart beat. 

The ECG tracing includes the following elements: P wave, QRS complex, ST segment, and T wave. The P wave, a small upward notch in the tracing, indicates electrical stimulation of the atria. This is followed by the QRS complex, which indicates the ventricles are electrically stimulated to contract. The short flat ST segment follows and indicates the time between the end of the ventricular contraction and the T wave. The T wave represents the recovery period of the ventricles. 

The physician reviews, interprets, and provides a written report of the ECG recording taking care to note any abnormalities. Use 93000 to report the complete procedure, including ECG tracing with physician review, interpretation, and report; use 93005 to report the tracing only; and use 93010 to report physician interpretation and written report only.`,
            copyright: "©2015-2025 DecisionHealth - Plain English Descriptions - All Rights Reserved"
          }
        };

      case "Related Procedure Codes":
        return {
          type: "rich-content",
          data: {
            title: "Related CPT CodeBook Guidelines & Related Codes",
            sections: [
              {
                title: "CPT CodeBook Guidelines:",
                content: "For ECG monitoring, use 99418",
                note: "Do not report 93000, 93005, 93010 in conjunction with 0525T-0532T (intracardiac ischemia monitoring system codes)"
              },
              {
                title: "Related ECG Codes:",
                codes: [
                  { code: "93000", description: "Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report" },
                  { code: "93005", description: "Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report" },
                  { code: "93010", description: "Electrocardiogram, routine ECG with at least 12 leads; interpretation and report only" },
                  { code: "93040", description: "Rhythm ECG, 1-3 leads; with interpretation and report" },
                  { code: "93041", description: "Rhythm ECG, 1-3 leads; tracing only without interpretation and report" },
                  { code: "93042", description: "Rhythm ECG, 1-3 leads; interpretation and report only" }
                ]
              },
              {
                title: "Cross-Referenced From:",
                references: [
                  { code: "94621", context: "Cardiopulmonary exercise testing - do not report with ECG codes during same session" },
                  { code: "0180T", context: "64+ lead ECG codes (deleted) - use 93799 for unlisted cardiovascular service" }
                ]
              }
            ]
          }
        };

      case "Medicare Allowable Fee (POS)":
        return {
          type: "medicare-fees",
          data: {
            title: "Calculated for DE (19801) - Novitas Solutions, Inc.",
            note: "* Note: Medicare may or MAY NOT reimburse you for this code. The fees provided below are based on values established by CMS/Medicare. Please check with your local Medicare contact on whether this code is eligible for reimbursement.",
            sections: [
              {
                name: "Facility (Hospital, etc.)",
                type: "collapsible",
                content: {
                  title: "Medicare vs. My Fee Evaluation",
                  table: [
                    {
                      modifier: "(none)",
                      medicareAllowed: "$6.08",
                      percentage150: "$9.12",
                      percentage200: "$12.17",
                      myFee: "(enter)"
                    }
                  ],
                  participatingSection: {
                    title: "Medicare Participating - Assignment Accepted (Mandatory)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$6.08",
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
                      }
                    ]
                  }
                }
              },
              {
                name: "Non-Facility (Office, etc.)",
                type: "collapsible",
                content: {
                  title: "Medicare vs. My Fee Evaluation",
                  table: [
                    {
                      modifier: "(none)",
                      medicareAllowed: "$6.08",
                      percentage150: "$9.12",
                      percentage200: "$12.17",
                      myFee: "(enter)"
                    }
                  ],
                  participatingSection: {
                    title: "Medicare Participating - Assignment Accepted (Mandatory)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$6.08",
                        medicare80: "$4.87",
                        patientPays: "$1.22"
                      }
                    ]
                  },
                  nonParticipatingAccepted: {
                    title: "Medicare Non-Participating - Assignment Accepted (Check To Doctor)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$5.78",
                        medicare80: "$4.62",
                        patientPays: "$1.16",
                        limitingCharge: "$6.65"
                      }
                    ]
                  },
                  nonParticipatingNotAccepted: {
                    title: "Medicare Non-Participating - Assignment NOT Accepted (Check To Patient)",
                    table: [
                      {
                        modifier: "(none)",
                        allowed: "$5.78",
                        medicare80: "$4.62",
                        patientPays: "$6.65",
                        limitingCharge: "$6.65"
                      }
                    ]
                  }
                }
              }
            ]
          }
        };

      case "CCI Edits & Modifier Indicator":
        return {
          type: "cci-ncci",
          data: {
            title: "NCCI Edits (PTP, MUE) - Facility",
            mue: {
              title: "NCCI MUE (Medically Unlikely Edit)",
              unitsOfService: "5",
              adjudicationIndicator: "3 Date of Service Edit: Clinical",
              description: "An MUE is the maximum units of service (UOS) reported for a HCPCS/CPT code on the vast majority of appropriately reported claims by the same provider/supplier for the same beneficiary on the same date of service. Not all HCPCS/CPT codes have an MUE.",
              rationale: "Clinical: Data",
              note: "Additional units are unlikely, an appeal will be necessary."
            },
            ptpEdits: {
              title: "NCCI PTP Edits (Procedure to Procedure)",
              description: "When codes are submitted together and an edit exists, Column 1 codes are eligible for payment, and Column 2 codes are not — unless an NCCI-associated modifier is both appropriate (depends on the situation) and allowed. Code pairs that are allowed with a modifier are indicated by 1. Pairs with 0 cannot be submitted together regardless of modifiers.",
              column1Code: "93005",
              column1Description: "93005 is a Column 1 code (reimbursable) in the following pairs:",
              column2Codes: [
                { code: "0543T", modifier: "1" },
                { code: "0544T", modifier: "1" },
                { code: "0545T", modifier: "1" },
                { code: "0573T", modifier: "1" },
                { code: "0574T", modifier: "1" },
                { code: "0580T", modifier: "1" },
                { code: "20561", modifier: "1" },
                { code: "20700", modifier: "1" },
                { code: "20701", modifier: "1" },
                { code: "21603", modifier: "1" },
                { code: "33017", modifier: "1" },
                { code: "33018", modifier: "1" },
                { code: "34718", modifier: "1" },
                { code: "35702", modifier: "1" },
                { code: "93041", modifier: "1" },
                { code: "93042", modifier: "1" }
              ]
            }
          }
        };

      case "ICD-10-CM Crosswalks":
        return {
          type: "crosswalk-table",
          data: {
            title: "ICD-10-CM Diagnosis Codes",
            subtitle: "Crosswalks are SUGGESTIONS ONLY. Please contact your Medicare contractor or payer if you have questions or to confirm the use of a code in documentation and/or billing.",
            categories: [
              {
                category: "Obesity & Metabolic",
                codes: [
                  { code: "E66.01", description: "Morbid (severe) obesity due to excess calories", status: "ACTIVE" },
                  { code: "E66.09", description: "Other obesity due to excess calories", status: "ACTIVE" },
                  { code: "E66.1", description: "Drug-induced obesity", status: "ACTIVE" },
                  { code: "E66.2", description: "Morbid (severe) obesity with alveolar hypoventilation", status: "ACTIVE" },
                  { code: "E66.3", description: "Overweight", status: "ACTIVE" },
                  { code: "E66.9", description: "Obesity, unspecified", status: "ACTIVE" }
                ]
              },
              {
                category: "Cardiovascular Conditions",
                codes: [
                  { code: "I42.0", description: "Dilated cardiomyopathy", status: "ACTIVE" },
                  { code: "I42.1", description: "Obstructive hypertrophic cardiomyopathy", status: "ACTIVE" },
                  { code: "I42.2", description: "Other hypertrophic cardiomyopathy", status: "ACTIVE" },
                  { code: "I45.81", description: "Long QT syndrome", status: "ACTIVE" },
                  { code: "I49.8", description: "Other specified cardiac arrhythmias", status: "ACTIVE" },
                  { code: "I49.9", description: "Cardiac arrhythmia, unspecified", status: "ACTIVE" }
                ]
              },
              {
                category: "Genetic Syndromes",
                codes: [
                  { code: "Q87.40", description: "Marfan syndrome, unspecified", status: "ACTIVE" },
                  { code: "Q87.410", description: "Marfan syndrome with aortic dilation", status: "ACTIVE" },
                  { code: "Q87.418", description: "Marfan syndrome with other cardiovascular manifestations", status: "ACTIVE" },
                  { code: "Q87.42", description: "Marfan syndrome with ocular manifestations", status: "ACTIVE" },
                  { code: "Q87.43", description: "Marfan syndrome with skeletal manifestation", status: "ACTIVE" }
                ]
              },
              {
                category: "Symptoms & Signs",
                codes: [
                  { code: "R00.2", description: "Palpitations", status: "ACTIVE" },
                  { code: "R01.0", description: "Benign and innocent cardiac murmurs", status: "ACTIVE" },
                  { code: "R01.1", description: "Cardiac murmur, unspecified", status: "ACTIVE" },
                  { code: "R03.0", description: "Elevated blood-pressure reading, without diagnosis of hypertension", status: "ACTIVE" },
                  { code: "R53.83", description: "Other fatigue", status: "ACTIVE" },
                  { code: "R55", description: "Syncope and collapse", status: "ACTIVE" }
                ]
              },
              {
                category: "Encounters & Examinations",
                codes: [
                  { code: "Z00.00", description: "Encounter for general adult medical examination without abnormal findings", status: "ACTIVE" },
                  { code: "Z00.01", description: "Encounter for general adult medical examination with abnormal findings", status: "ACTIVE" },
                  { code: "Z00.121", description: "Encounter for routine child health examination with abnormal findings", status: "ACTIVE" },
                  { code: "Z00.129", description: "Encounter for routine child health examination without abnormal findings", status: "ACTIVE" }
                ]
              },
              {
                category: "BMI Classifications",
                codes: [
                  { code: "Z68.25", description: "Body mass index [BMI] 25.0-25.9, adult", status: "ACTIVE" },
                  { code: "Z68.30", description: "Body mass index [BMI]30.0-30.9, adult", status: "ACTIVE" },
                  { code: "Z68.35", description: "Body mass index [BMI] 35.0-35.9, adult", status: "ACTIVE" },
                  { code: "Z68.41", description: "Body mass index [BMI]40.0-44.9, adult", status: "ACTIVE" },
                  { code: "Z68.45", description: "Body mass index [BMI] 70 or greater, adult", status: "ACTIVE" }
                ]
              },
              {
                category: "Family History",
                codes: [
                  { code: "Z82.41", description: "Family history of sudden cardiac death", status: "ACTIVE" },
                  { code: "Z82.49", description: "Family history of ischemic heart disease and other diseases of the circulatory system", status: "ACTIVE" },
                  { code: "Z84.81", description: "Family history of carrier of genetic disease", status: "ACTIVE" }
                ]
              }
            ]
          }
        };

      case "CPT Assistant Articles":
        return {
          type: "articles-list",
          data: {
            title: "CPT® Assistant Articles (4)",
            description: "Expert insights and interpretations by the CPT Assistant Editorial Board with detailed examples, charts, graphs and illustrations to help understand correct coding practices.",
            accessNote: "Access to this feature is available in the following products: AMA's CPT® Assistant - Current + Archives/Advanced Coding Pack",
            articles: [
              {
                year: "2020",
                title: "Pulmonary Diagnostic Testing and Therapies Services 2021 Update",
                month: "December 2020"
              },
              {
                year: "2017",
                title: "Pulmonary Diagnostic Testing and Therapies",
                month: "October 2017"
              },
              {
                year: "2016",
                title: "Evaluation and Management: Hospital Inpatient Services (Q&A)",
                month: "April 2016"
              },
              {
                year: "2004",
                title: "Additional Coding Changes to the Category III Codes",
                month: "July 2004"
              }
            ]
          }
        };

      case "AHA Coding Clinic":
        return {
          type: "articles-list",
          data: {
            title: "AHA Coding Clinic® Articles (5)",
            description: "Official publication for Level I HCPCS (CPT-4 codes) for hospital providers, also covering specific Level II HCPCS codes for hospitals, physicians and other health professionals.",
            accessNote: "Access to this feature is available in the following products: AHA's Coding Clinic® - HCPCS +Archives",
            articles: [
              {
                year: "2024",
                title: "For Your Information: New CPT Category III codes",
                month: "2024"
              },
              {
                year: "2024",
                title: "For Your Information: New and Revised CPT Category III Codes",
                month: "2024"
              },
              {
                year: "2015",
                title: "Bundling/unbundling caution is essential for accurate coding and reporting",
                month: "2015"
              },
              {
                year: "2004",
                title: "CMS further defines observation care",
                month: "2004"
              },
              {
                year: "2002",
                title: "FOR your INFORMATION: Observation services, HCPCS, and APC's",
                month: "2002"
              }
            ]
          }
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

    if (content.type === "rich-content") {
      return (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900">{content.data.title}</h4>
          
          {content.data.content && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content.data.content}</p>
            </div>
          )}
          
          {content.data.sections && content.data.sections.map((section, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-3">
              <h5 className="font-semibold text-gray-900">{section.title}</h5>
              
              {section.content && (
                <p className="text-gray-700">{section.content}</p>
              )}
              
              {section.note && (
                <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <strong>Note:</strong> {section.note}
                </p>
              )}
              
              {section.codes && (
                <div className="space-y-2">
                  {section.codes.map((code, codeIndex) => (
                    <div key={codeIndex} className="flex gap-3 items-start">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 font-mono">
                        {code.code}
                      </Badge>
                      <span className="text-sm text-gray-700">{code.description}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {section.references && (
                <div className="space-y-2">
                  <h6 className="font-medium text-gray-800">References:</h6>
                  {section.references.map((ref, refIndex) => (
                    <div key={refIndex} className="flex gap-3 items-start">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 font-mono">
                        {ref.code}
                      </Badge>
                      <span className="text-sm text-gray-600">{ref.context}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {content.data.copyright && (
            <p className="text-xs text-gray-500 mt-4">{content.data.copyright}</p>
          )}
        </div>
      );
    }

    if (content.type === "crosswalk-table") {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{content.data.title}</h4>
            <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              {content.data.subtitle}
            </p>
          </div>
          
          {content.data.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <h5 className="font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">
                {category.category}
              </h5>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">ICD-10-CM Code</TableHead>
                      <TableHead className="font-semibold text-gray-700">Description</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.codes.map((code, codeIndex) => (
                      <TableRow key={codeIndex}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {code.code}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{code.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={code.status === "ACTIVE" ? "default" : "secondary"}
                            className={code.status === "ACTIVE" ? "bg-green-100 text-green-800" : ""}
                          >
                            {code.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (content.type === "articles-list") {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{content.data.title}</h4>
            <p className="text-gray-700 mb-3">{content.data.description}</p>
            <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
              {content.data.accessNote}
            </p>
          </div>
          
          <div className="space-y-3">
            {content.data.articles.map((article, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-1">{article.title}</h5>
                    <p className="text-sm text-gray-600">{article.month}</p>
                  </div>
                  <Badge variant="outline" className="ml-3 bg-blue-50 text-blue-700">
                    {article.year}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (content.type === "cci-ncci") {
      return (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900">{content.data.title}</h4>
          
          {/* MUE Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-3">{content.data.mue.title}</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Units of Service:</span>
                <p className="text-lg font-bold text-blue-600">{content.data.mue.unitsOfService}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Adjudication Indicator:</span>
                <p className="text-sm text-gray-800">{content.data.mue.adjudicationIndicator}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{content.data.mue.description}</p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-800">Rationale: {content.data.mue.rationale}</p>
              <p className="text-sm text-yellow-700 mt-1">{content.data.mue.note}</p>
            </div>
          </div>
          
          {/* PTP Edits Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-3">{content.data.ptpEdits.title}</h5>
            <p className="text-sm text-gray-700 mb-4">{content.data.ptpEdits.description}</p>
            
            <div className="mb-4">
              <p className="font-medium text-gray-900">{content.data.ptpEdits.column1Description}</p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700">Column 2 Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Modifier Allowed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.data.ptpEdits.column2Codes.map((code, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {code.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={code.modifier === "1" ? "default" : "secondary"}
                          className={code.modifier === "1" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {code.modifier === "1" ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                        <h5 className="font-semibold text-gray-900 mb-4">{section.content.participatingSection?.title}</h5>
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
                              {section.content.participatingSection?.table.map((row, rowIndex) => (
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
                          {section.content.nonParticipatingAccepted?.title}
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
                              {section.content.nonParticipatingAccepted?.table.map((row, rowIndex) => (
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
                          {section.content.nonParticipatingNotAccepted?.title}
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
                              {section.content.nonParticipatingNotAccepted?.table.map((row, rowIndex) => (
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

    if (content.type === "rvu-breakdown") {
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
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors">
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
                  {section.name === "Facility 21.840 (Hospital, etc.)" && section.content && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                      {/* RVU Components */}
                      {section.content.rvuComponents && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-4">{section.content.rvuComponents.title}</h5>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                  <th className="border border-gray-200 px-3 py-2 text-left font-medium">work</th>
                                  <th className="border border-gray-200 px-3 py-2 text-left font-medium">practice expense</th>
                                  <th className="border border-gray-200 px-3 py-2 text-left font-medium">malpractice expense</th>
                                  <th className="border border-gray-200 px-3 py-2 text-left font-medium">total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.content.rvuComponents.table.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                    <td className="border border-gray-200 px-3 py-2">{row.work}</td>
                                    <td className="border border-gray-200 px-3 py-2">{row.practiceExpense}</td>
                                    <td className="border border-gray-200 px-3 py-2">{row.malpracticeExpense}</td>
                                    <td className="border border-gray-200 px-3 py-2 font-semibold">{row.total}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Access Feature Notice */}
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                            <p className="text-sm text-gray-700 mb-2">Calculated fee values are available.</p>
                            <p className="text-sm text-gray-700 mb-3">Access to this feature is available in the following products:</p>
                            <ul className="text-sm text-gray-700 mb-3 ml-4">
                              <li>• Find-A-Code Facility Base/Plus/Complete</li>
                            </ul>
                            <Button variant="outline" size="sm" className="text-sm">
                              subscribe
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Practitioner Work Component */}
                      {section.content.practitionerWork && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-4">{section.content.practitionerWork.title}</h5>
                          
                          {/* Practitioner Labor */}
                          <div className="mb-6">
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practitionerWork.laborSection.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">pre-service</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">intra-service</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">post-service</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">total time*</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-200 px-3 py-2">{section.content.practitionerWork.laborSection.table.preService}</td>
                                    <td className="border border-gray-200 px-3 py-2">{section.content.practitionerWork.laborSection.table.intraService}</td>
                                    <td className="border border-gray-200 px-3 py-2">{section.content.practitionerWork.laborSection.table.postService}</td>
                                    <td className="border border-gray-200 px-3 py-2">{section.content.practitionerWork.laborSection.table.totalTime}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">{section.content.practitionerWork.laborSection.note}</p>
                          </div>

                          {/* Work RVU Components */}
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practitionerWork.workRVUComponents.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">national unadjusted work rvu</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">work gpci</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">adjusted work rvu</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.content.practitionerWork.workRVUComponents.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.nationalUnadjustedWorkRVU}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.workGPCI}</td>
                                      <td className="border border-gray-200 px-3 py-2 font-semibold">{row.adjustedWorkRVU}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Practice Expense */}
                      {section.content.practiceExpense && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-4">{section.content.practiceExpense.title}</h5>
                          
                          {/* Clinical Labor */}
                          <div className="mb-6">
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practiceExpense.clinicalLabor.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">staff</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">staff rate</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">pre time</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">intra time</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">post time</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">total time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.content.practiceExpense.clinicalLabor.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border border-gray-200 px-3 py-2">{row.staff}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.staffRate}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.preTime}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.intraTime}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.postTime}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.totalTime}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Equipment */}
                          <div className="mb-6">
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practiceExpense.equipment.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">item</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">purchase price</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">expected life</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">total time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.content.practiceExpense.equipment.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border border-gray-200 px-3 py-2">{row.item}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.purchasePrice}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.expectedLife}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.totalTime}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Supplies */}
                          <div className="mb-6">
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practiceExpense.supplies.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">item</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">unit price</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">quantity</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">unit</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.content.practiceExpense.supplies.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border border-gray-200 px-3 py-2">{row.item}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.unitPrice}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.quantity}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.unit}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.amount}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">{section.content.practiceExpense.indirectNote}</p>

                          {/* PE RVU Components */}
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-3">{section.content.practiceExpense.peRVUComponents.title}</h6>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">modifier</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">national unadjusted pe rvu</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">pe gpci</th>
                                    <th className="border border-gray-200 px-3 py-2 text-left font-medium">adjusted pe rvu</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.content.practiceExpense.peRVUComponents.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border border-gray-200 px-3 py-2">{row.modifier}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.nationalUnadjustedPERVU}</td>
                                      <td className="border border-gray-200 px-3 py-2">{row.peGPCI}</td>
                                      <td className="border border-gray-200 px-3 py-2 font-semibold">{row.adjustedPERVU}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {section.name !== "Facility 21.840 (Hospital, etc.)" && (
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
        <p className="text-gray-700">
          {content.type === "content" ? content.data : `This is sample content for ${element.ElementName}. In a real application, this would be populated with actual data from your API or database.`}
        </p>
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
