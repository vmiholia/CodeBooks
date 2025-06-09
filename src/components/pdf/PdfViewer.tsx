
import React from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PdfViewerProps {
  file: File;
  numPages: number | null;
  currentPage: number;
  error: string | null;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onDocumentLoadError: (error: Error) => void;
  onPageChange: (page: number) => void;
}

export const PdfViewer = ({
  file,
  numPages,
  currentPage,
  error,
  onDocumentLoadSuccess,
  onDocumentLoadError,
  onPageChange,
}: PdfViewerProps) => {
  if (error) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>PDF Preview</CardTitle>
          {numPages && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                size="sm"
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {numPages}
              </span>
              <Button
                onClick={() => onPageChange(Math.min(numPages, currentPage + 1))}
                disabled={currentPage >= numPages}
                size="sm"
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-auto max-h-96 bg-gray-50">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="p-8 text-center">
                <div className="text-sm text-muted-foreground">Loading PDF...</div>
              </div>
            }
            error={
              <div className="p-8 text-center text-red-600">
                <div>Failed to load PDF</div>
              </div>
            }
          >
            {numPages && (
              <Page
                pageNumber={currentPage}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mx-auto"
                width={Math.min(600, window.innerWidth - 100)}
              />
            )}
          </Document>
        </div>
      </CardContent>
    </Card>
  );
};
