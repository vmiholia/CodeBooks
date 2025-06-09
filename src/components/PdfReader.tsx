
import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, FileText, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfReaderProps {
  onTextExtracted?: (text: string, filename: string) => void;
}

export const PdfReader = ({ onTextExtracted }: PdfReaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setExtractedText('');
      setCurrentPage(1);
    } else {
      setError('Please select a valid PDF file');
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  }, []);

  const extractTextFromPdf = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n\n--- Page ${i} ---\n\n${pageText}`;
      }
      
      setExtractedText(fullText);
      onTextExtracted?.(fullText, file.name);
    } catch (error) {
      setError(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [file, onTextExtracted]);

  const clearFile = useCallback(() => {
    setFile(null);
    setNumPages(null);
    setCurrentPage(1);
    setExtractedText('');
    setError(null);
  }, []);

  const downloadExtractedText = useCallback(() => {
    if (!extractedText || !file) return;
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace('.pdf', '')}_extracted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [extractedText, file]);

  return (
    <div className="space-y-6">
      {/* File Upload */}
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
                Select a PDF file to view and extract text content
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={onFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose PDF File
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
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={extractTextFromPdf}
                    disabled={isLoading}
                    size="sm"
                  >
                    {isLoading ? 'Extracting...' : 'Extract Text'}
                  </Button>
                  <Button onClick={clearFile} variant="outline" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* PDF Viewer */}
      {file && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>PDF Preview</CardTitle>
              {numPages && (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                    onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
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
            <div className="border rounded-lg overflow-auto max-h-96">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="p-8 text-center">Loading PDF...</div>}
              >
                <Page
                  pageNumber={currentPage}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mx-auto"
                />
              </Document>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extracted Text */}
      {extractedText && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Extracted Text</CardTitle>
              <Button onClick={downloadExtractedText} size="sm" variant="outline">
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};
