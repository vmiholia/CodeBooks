
import React from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  file: File | null;
  isLoading: boolean;
  isExtracting: boolean;
  loadProgress: number;
  extractProgress: number;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
}

export const FileUpload = ({
  file,
  isLoading,
  isExtracting,
  loadProgress,
  extractProgress,
  onFileChange,
  onClearFile,
}: FileUploadProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>PDF Reader</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload PDF File</h3>
            <p className="text-muted-foreground mb-4">
              Select a PDF file to view and extract text content automatically
            </p>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={onFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Choose PDF File</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium truncate">{file.name}</span>
                <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
              </div>
              <Button onClick={onClearFile} variant="outline" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {(isLoading || isExtracting) && (
              <div className="space-y-3">
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Loading PDF</span>
                      <span>{loadProgress}%</span>
                    </div>
                    <Progress value={loadProgress} className="h-2" />
                  </div>
                )}
                
                {isExtracting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Extracting Text</span>
                      <span>{extractProgress}%</span>
                    </div>
                    <Progress value={extractProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
