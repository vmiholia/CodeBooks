
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info, DollarSign } from "lucide-react";
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
      case "CPT Code":
        return (
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{codeId}</div>
            <p className="text-lg font-medium">Current Procedural Terminology Code</p>
          </div>
        );

      case "Official CPT Descriptor":
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

      case "CCI Edits & Modifier Indicator":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Validation: PASS</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Edit Type</TableHead>
                  <TableHead>Related Code</TableHead>
                  <TableHead>Modifier</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Column 1</TableCell>
                  <TableCell>29887</TableCell>
                  <TableCell>59</TableCell>
                  <TableCell><Badge variant="secondary">Allowed</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mutually Exclusive</TableCell>
                  <TableCell>27447</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Badge variant="destructive">Restricted</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );

      case "Global Period":
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
