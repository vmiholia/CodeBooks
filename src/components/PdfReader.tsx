import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, FileText, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
  const [isExtracting, setIsExtracting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [extractProgress, setExtractProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed:', event.target.files);
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    console.log('Selected file:', selectedFile.name, selectedFile.type, selectedFile.size);
    
    if (selectedFile.type === 'application/pdf') {
      console.log('Setting file and initializing states...');
      setFile(selectedFile);
      setError(null);
      setExtractedText('');
      setCurrentPage(1);
      setNumPages(null);
      setIsLoading(true);
      setLoadProgress(10); // Start with some progress to show activity
      setExtractProgress(0);
      console.log('PDF file set successfully, loading should start now');
    } else {
      console.log('Invalid file type:', selectedFile.type);
      setError(`Please select a valid PDF file. Selected file type: ${selectedFile.type}`);
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log('onDocumentLoadSuccess called with', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
    setLoadProgress(100);
    console.log('PDF loaded successfully, starting text extraction...');
    
    // Auto-extract text when PDF loads successfully
    setTimeout(() => {
      console.log('About to call extractTextFromPdf');
      extractTextFromPdf();
    }, 100);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('onDocumentLoadError called:', error);
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
    setLoadProgress(0);
  }, []);

  const onDocumentLoadProgress = useCallback(({ loaded, total }: { loaded: number; total: number }) => {
    if (total > 0) {
      const progress = Math.min(Math.round((loaded / total) * 90), 90); // Cap at 90% until fully loaded
      console.log('PDF loading progress:', progress, '%', loaded, '/', total);
      setLoadProgress(progress);
    }
  }, []);

  const extractTextFromPdf = useCallback(async () => {
    if (!file) {
      console.log('No file to extract text from');
      return;
    }

    console.log('Starting text extraction from:', file.name);
    setIsExtracting(true);
    setExtractProgress(0);
    setError(null);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      console.log('File read as array buffer, size:', arrayBuffer.byteLength);
      
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      console.log('PDF document loaded for text extraction, pages:', pdf.numPages);
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        console.log('Extracting text from page', i);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n\n--- Page ${i} ---\n\n${pageText}`;
        
        // Update extraction progress
        const progress = Math.round((i / pdf.numPages) * 100);
        setExtractProgress(progress);
      }
      
      console.log('Text extraction completed, total length:', fullText.length);
      setExtractedText(fullText);
      onTextExtracted?.(fullText, file.name);
    } catch (error) {
      console.error('Text extraction error:', error);
      setError(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setExtractProgress(0);
    } finally {
      setIsExtracting(false);
    }
  }, [file, onTextExtracted]);

  const clearFile = useCallback(() => {
    console.log('Clearing file');
    setFile(null);
    setNumPages(null);
    setCurrentPage(1);
    setExtractedText('');
    setError(null);
    setIsLoading(false);
    setIsExtracting(false);
    setLoadProgress(0);
    setExtractProgress(0);
    
    // Reset the file input
    const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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
                <Button onClick={clearFile} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Progress indicators */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loading PDF</span>
                    <span>{loadProgress}%</span>
                  </div>
                  <Progress value={loadProgress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Extracting Text</span>
                    <span>{extractProgress}%</span>
                  </div>
                  <Progress value={extractProgress} className="h-2" />
                </div>
              </div>
              
              {isLoading && (
                <Badge variant="secondary">Loading PDF...</Badge>
              )}
              {isExtracting && (
                <Badge variant="secondary">Extracting text...</Badge>
              )}
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
      {file && !error && (
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
            <div className="border rounded-lg overflow-auto max-h-96 bg-gray-50">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="text-sm text-muted-foreground">Loading PDF... {loadProgress}%</div>
                </div>
              ) : (
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  onLoadProgress={onDocumentLoadProgress}
                  loading={
                    <div className="p-8 text-center">
                      <div className="text-sm text-muted-foreground">Loading PDF document...</div>
                    </div>
                  }
                  error={
                    <div className="p-8 text-center text-red-600">
                      <div>Failed to load PDF</div>
                      <div className="text-sm mt-2">Check console for details</div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={currentPage}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mx-auto"
                    width={Math.min(600, window.innerWidth - 100)}
                    onLoadSuccess={() => console.log(`Page ${currentPage} rendered successfully`)}
                    onLoadError={(error) => console.error(`Page ${currentPage} load error:`, error)}
                  />
                </Document>
              )}
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
            <div className="mt-2">
              <Badge variant="outline">
                {(extractedText.length / 1000).toFixed(1)}k characters extracted
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
