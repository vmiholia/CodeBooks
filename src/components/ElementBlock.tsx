
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info, DollarSign, Clock, Building2, FileText } from "lucide-react";
import type { CodeDataElement } from "@/types/codeData";

interface ElementBlockProps {
  element: CodeDataElement;
  codeId: string;
}

export const ElementBlock = ({ element, codeId }: ElementBlockProps) => {
  // Create a scroll target ID from the element name
  const scrollId = element.ElementName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  const renderElementContent = () => {
    switch (element.ElementName) {
      case "Official CPT Descriptor":
        if (codeId === "93005") {
          return (
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed font-medium mb-2">
                Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Code Components:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Routine ECG with minimum 12 leads</li>
                  <li>• Tracing only - technical component</li>
                  <li>• Does not include interpretation or report</li>
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">
              Arthroscopically aided anterior cruciate ligament repair/augmentation or reconstruction. 
              This procedure involves the use of arthroscopic techniques to visualize and assist in the 
              repair or reconstruction of a torn anterior cruciate ligament (ACL).
            </p>
          </div>
        );

      case "Lay Description":
        if (codeId === "93005") {
          return (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-foreground mb-3">
                An electrocardiogram (ECG or EKG) is a test that records the electrical activity of the heart. 
                This code covers only the technical recording of the heart rhythm using at least 12 different 
                electrical views of the heart.
              </p>
              <div className="text-sm text-muted-foreground">
                <strong>Patient-friendly explanation:</strong> A routine heart rhythm test where electrodes 
                are placed on your chest, arms, and legs to record your heart's electrical activity. 
                This code covers only the recording portion, not the doctor's review of the results.
              </div>
            </div>
          );
        }
        return (
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-foreground">
              A minimally invasive surgical procedure to repair or replace a torn ACL using 
              small incisions and a camera to guide the surgery. This helps restore knee 
              stability and function.
            </p>
          </div>
        );

      case "Clinical Vignette":
        if (codeId === "93005") {
          return (
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Example Scenario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  A 45-year-old patient presents to the clinic with complaints of chest pain and palpitations. 
                  The physician orders a routine 12-lead ECG to evaluate cardiac rhythm and identify any 
                  abnormalities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Indication</Badge>
                    <span className="text-sm">Chest pain evaluation, routine cardiac screening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Procedure</Badge>
                    <span className="text-sm">12-lead ECG tracing performed by technician</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Code Usage</Badge>
                    <span className="text-sm">93005 for tracing only (separate interpretation code required)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }
        return (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg">Example Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                A 22-year-old soccer player presents with knee instability following a 
                non-contact injury during practice. MRI confirms complete ACL tear.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Indication</Badge>
                  <span className="text-sm">Complete ACL rupture with instability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Approach</Badge>
                  <span className="text-sm">Arthroscopic reconstruction with graft</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "Related Procedure Codes":
        if (codeId === "93005") {
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Relationship</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>93000</TableCell>
                  <TableCell>Electrocardiogram, routine ECG with interpretation and report</TableCell>
                  <TableCell><Badge variant="secondary">Complete Service</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>93010</TableCell>
                  <TableCell>Electrocardiogram, routine ECG interpretation and report only</TableCell>
                  <TableCell><Badge variant="secondary">Professional Component</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>93040</TableCell>
                  <TableCell>Rhythm ECG, 1-3 leads; with interpretation and report</TableCell>
                  <TableCell><Badge variant="outline">Related</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        }
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Relationship</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>29887</TableCell>
                <TableCell>Arthroscopic repair of ACL</TableCell>
                <TableCell><Badge variant="secondary">Similar</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>29889</TableCell>
                <TableCell>Arthroscopic ACL reconstruction with allograft</TableCell>
                <TableCell><Badge variant="secondary">Alternative</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );

      case "Global Period":
        if (codeId === "93005") {
          return (
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary mr-2" />
                  <span className="text-lg font-medium">Global Period</span>
                </div>
                <div className="text-6xl font-bold text-primary mb-2">XXX</div>
                <p className="text-lg font-medium">Global Period Not Applicable</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Diagnostic procedures typically do not have global periods
                </p>
              </CardContent>
            </Card>
          );
        }
        return (
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-6xl font-bold text-primary mb-2">90</div>
              <p className="text-lg font-medium">Days Global Period</p>
              <p className="text-sm text-muted-foreground mt-2">
                Includes pre-operative, intra-operative, and post-operative care
              </p>
            </CardContent>
          </Card>
        );

      case "Medicare Allowable Fee (POS)":
        if (codeId === "93005") {
          return (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium">2024 Medicare Fee Schedule - CPT 93005</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Place of Service</TableHead>
                    <TableHead>Facility Fee</TableHead>
                    <TableHead>Non-Facility Fee</TableHead>
                    <TableHead>Limiting Charge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Office</TableCell>
                    <TableCell>$13.16</TableCell>
                    <TableCell>$25.84</TableCell>
                    <TableCell>$29.72</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Outpatient Hospital</TableCell>
                    <TableCell>$13.16</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>$15.13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ASC</TableCell>
                    <TableCell>$13.16</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>$15.13</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="font-medium">2024 Medicare Fee Schedule</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Place of Service</TableHead>
                  <TableHead>Facility Fee</TableHead>
                  <TableHead>Non-Facility Fee</TableHead>
                  <TableHead>Limiting Charge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Outpatient Hospital</TableCell>
                  <TableCell>$1,247.52</TableCell>
                  <TableCell>$1,689.24</TableCell>
                  <TableCell>$1,942.63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ASC</TableCell>
                  <TableCell>$1,247.52</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>$1,434.65</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );

      case "RVU Breakdown":
        if (codeId === "93005") {
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Non-Facility</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Work RVU</TableCell>
                  <TableCell>0.17</TableCell>
                  <TableCell>0.17</TableCell>
                  <TableCell>Physician work component</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PE RVU</TableCell>
                  <TableCell>0.19</TableCell>
                  <TableCell>0.53</TableCell>
                  <TableCell>Practice expense</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MP RVU</TableCell>
                  <TableCell>0.02</TableCell>
                  <TableCell>0.02</TableCell>
                  <TableCell>Malpractice expense</TableCell>
                </TableRow>
                <TableRow className="border-t-2">
                  <TableCell className="font-bold">Total RVU</TableCell>
                  <TableCell className="font-bold">0.38</TableCell>
                  <TableCell className="font-bold">0.72</TableCell>
                  <TableCell className="font-bold">Total relative value</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        }
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Non-Facility</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Work RVU</TableCell>
                <TableCell>22.25</TableCell>
                <TableCell>22.25</TableCell>
                <TableCell>Physician work component</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PE RVU</TableCell>
                <TableCell>12.84</TableCell>
                <TableCell>28.47</TableCell>
                <TableCell>Practice expense</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MP RVU</TableCell>
                <TableCell>2.48</TableCell>
                <TableCell>2.48</TableCell>
                <TableCell>Malpractice expense</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );

      case "ICD-10-CM Crosswalks":
        if (codeId === "93005") {
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ICD-10-CM Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Relationship</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Z01.810</TableCell>
                  <TableCell>Encounter for preprocedural cardiovascular examination</TableCell>
                  <TableCell><Badge>Primary</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>R06.02</TableCell>
                  <TableCell>Shortness of breath</TableCell>
                  <TableCell><Badge>Common</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>R50.9</TableCell>
                  <TableCell>Fever, unspecified</TableCell>
                  <TableCell><Badge variant="secondary">Secondary</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>I25.10</TableCell>
                  <TableCell>Atherosclerotic heart disease of native coronary artery without angina pectoris</TableCell>
                  <TableCell><Badge variant="secondary">Secondary</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        }
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ICD-10-CM Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Relationship</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>S83.511A</TableCell>
                <TableCell>Sprain of anterior cruciate ligament of right knee, initial encounter</TableCell>
                <TableCell><Badge>Primary</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>S83.512A</TableCell>
                <TableCell>Sprain of anterior cruciate ligament of left knee, initial encounter</TableCell>
                <TableCell><Badge>Primary</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>M23.611</TableCell>
                <TableCell>Other spontaneous disruption of anterior cruciate ligament of right knee</TableCell>
                <TableCell><Badge variant="secondary">Secondary</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );

      case "Inpatient-Only (IPO) Flag":
        if (codeId === "93005") {
          return (
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-lg font-medium">Inpatient-Only Status</span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">No</div>
                <p className="text-lg font-medium text-green-600">Not Inpatient-Only</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This procedure can be performed in various settings including outpatient facilities
                </p>
              </CardContent>
            </Card>
          );
        }
        return (
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">Yes</div>
              <p className="text-lg font-medium text-orange-600">Inpatient-Only</p>
              <p className="text-sm text-muted-foreground mt-2">
                This procedure must be performed in an inpatient hospital setting
              </p>
            </CardContent>
          </Card>
        );

      case "MUE (Medically Unlikely Edit)":
        if (codeId === "93005") {
          return (
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  MUE Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Setting</TableHead>
                      <TableHead>MUE Value</TableHead>
                      <TableHead>Edit Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Practitioner Services</TableCell>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell><Badge variant="outline">Date of Service</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Outpatient Hospital</TableCell>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell><Badge variant="outline">Date of Service</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-sm text-muted-foreground mt-3">
                  Maximum of 1 unit per date of service. Additional units require documentation supporting medical necessity.
                </p>
              </CardContent>
            </Card>
          );
        }
        return (
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-lg">MUE Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <p className="text-lg font-medium">Maximum Units per Date of Service</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Bilateral procedures or documentation supporting medical necessity required for additional units.
              </p>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {element.Definition || `Content for ${element.ElementName} would be displayed here with appropriate UI treatment based on the data type and usage context.`}
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <Card id={scrollId} className="border border-border/50 scroll-mt-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {element.ElementName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderElementContent()}
      </CardContent>
    </Card>
  );
};
