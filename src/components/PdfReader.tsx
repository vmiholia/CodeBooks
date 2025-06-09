
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PdfReaderProps } from '@/types/pdf';
import { configurePdfWorker } from '@/utils/pdfConfig';
import { FileUpload } from '@/components/pdf/FileUpload';
import { PdfViewer } from '@/components/pdf/PdfViewer';
import { ExtractedText } from '@/components/pdf/ExtractedText';
import { usePdfExtraction } from '@/hooks/usePdfExtraction';

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

  const { extractTextFromPdf } = usePdfExtraction();

  useEffect(() => {
    configurePdfWorker();
  }, []);

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed');
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    console.log('File selected:', selectedFile.name, selectedFile.type, selectedFile.size);
    
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setExtractedText('');
      setCurrentPage(1);
      setNumPages(null);
      setIsLoading(true);
      setLoadProgress(0);
      setExtractProgress(0);
      console.log('PDF file set, starting load process');
    } else {
      setError(`Please select a valid PDF file. Selected file type: ${selectedFile.type}`);
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
    setLoadProgress(100);
    
    // Start text extraction automatically
    if (file) {
      setIsExtracting(true);
      extractTextFromPdf(
        file,
        setExtractProgress,
        (text: string) => {
          setExtractedText(text);
          setIsExtracting(false);
          onTextExtracted?.(text, file.name);
        },
        (errorMsg: string) => {
          setError(errorMsg);
          setIsExtracting(false);
        }
      );
    }
  }, [file, extractTextFromPdf, onTextExtracted]);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
    setLoadProgress(0);
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setNumPages(null);
    setCurrentPage(1);
    setExtractedText('');
    setError(null);
    setIsLoading(false);
    setIsExtracting(false);
    setLoadProgress(0);
    setExtractProgress(0);
    
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
      <FileUpload
        file={file}
        isLoading={isLoading}
        isExtracting={isExtracting}
        loadProgress={loadProgress}
        extractProgress={extractProgress}
        onFileChange={onFileChange}
        onClearFile={clearFile}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {file && !error && (
        <PdfViewer
          file={file}
          numPages={numPages}
          currentPage={currentPage}
          error={error}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          onDocumentLoadError={onDocumentLoadError}
          onPageChange={setCurrentPage}
        />
      )}

      <ExtractedText
        extractedText={extractedText}
        filename={file?.name || null}
        onDownload={downloadExtractedText}
      />
    </div>
  );
};
