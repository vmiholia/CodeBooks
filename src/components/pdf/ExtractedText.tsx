
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExtractedTextProps {
  extractedText: string;
  filename: string | null;
  onDownload: () => void;
}

export const ExtractedText = ({ extractedText, filename, onDownload }: ExtractedTextProps) => {
  if (!extractedText) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Extracted Text</CardTitle>
          <Button onClick={onDownload} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Text
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono">
            {extractedText}
          </pre>
        </div>
        <div className="mt-2">
          <Badge variant="outline">
            {(extractedText.length / 1000).toFixed(1)}k characters extracted
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
